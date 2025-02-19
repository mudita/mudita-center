/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import {
  APIFileTransferService,
  APIDataTransferService,
  ServiceBridge,
} from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { DataTransferDomain } from "Libs/device/models/src"
import {
  getEmptyTransferData,
  getFullTransferData,
  getInvalidTransferData,
} from "./helpers/file-transfer-data"
import { delay } from "shared/utils"

jest.mock("shared/utils", () => {
  return {
    callRenderer: () => {},
    delay: () => {
      return new Promise((resolve) => setTimeout(resolve, 500))
    },
  }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

describe("Data transfer", () => {
  let deviceProtocol: DeviceProtocol
  let importFeatures: {
    feature: string
    key: DataTransferDomain
  }[]

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    fetchSupportedFeatures()
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should perform import process for empty restore data", async () => {
    const base64Sources = getEmptyTransferData()
    await performDataTransfer(base64Sources, false)
  }, 30000)

  it("should perform import process for restore data with one item per feature", async () => {
    const base64Sources = getFullTransferData()
    await performDataTransfer(base64Sources, false)
  }, 30000)

  it("should perform import process for every single feature", async () => {
    const base64Sources = getFullTransferData()
    for (const [feature, base64] of Object.entries(base64Sources)) {
      await performDataTransfer({ [feature]: base64 }, false)
    }
  }, 30000)

  it("should return error on invalid data for features", async () => {
    const base64Sources = getInvalidTransferData()
    await performDataTransfer(base64Sources, true)
  }, 30000)

  //TODO - To consider getting this data from the config
  function fetchSupportedFeatures() {
    importFeatures = [
      { feature: "CONTACTS_LIST", key: "contacts-v1" },
      { feature: "CALL_LOG", key: "callLog-v1" },
      { feature: "MESSAGES", key: "messages-v1" },
      { feature: "ALARMS", key: "alarms-v1" },
      { feature: "NOTES", key: "notes-v1" },
    ]
  }

  async function performDataTransfer(
    base64Sources: { [key: string]: string } = {},
    errorExpected: boolean
  ) {
    const serviceBridge = new ServiceBridge()
    const filteredRestoreFeatures = importFeatures.filter(
      ({ feature }) => feature in base64Sources
    )
    let importProgress = 0
    let dataTransferId = -1
    let domainsResponse: { [key: string]: string } = {}

    const apiDataTransferService = new APIDataTransferService(deviceProtocol)
    const apiTransferService = new APIFileTransferService(
      deviceProtocol,
      serviceBridge
    )

    const deleteTransferResponse = await apiTransferService.transferSendDelete({
      transferId: -1,
    })

    const result = await apiDataTransferService.startPreDataTransfer({
      domains: filteredRestoreFeatures.map((item) => item.key),
    })
    expect(result.ok).toBeTruthy()
    if (result.ok) {
      expect(result.data.dataTransferId).toBeGreaterThan(0)

      dataTransferId = result.data.dataTransferId
      domainsResponse = result.data.domains
    }

    expect(dataTransferId).toBeGreaterThan(0)
    expect(Object.keys(domainsResponse).length).toEqual(
      filteredRestoreFeatures.length
    )

    for (const [feature, featurePath] of Object.entries(domainsResponse)) {
      const foundFeature = importFeatures.find((item) => item.key === feature)
      expect(foundFeature).toBeDefined()
      if (foundFeature === undefined) {
        break
      }
      const base64Source = base64Sources[foundFeature.feature]
      const preTransferResponse = await apiTransferService.preTransferSend({
        targetPath: featurePath,
        source: { base64: base64Source },
      })
      expect(preTransferResponse.ok).toBeTruthy()
      if (preTransferResponse.ok) {
        const fileTransferResponse = await apiTransferService.transferSend({
          transferId: preTransferResponse.data.transferId,
          chunkNumber: 1,
          repeats: 0,
          maxRepeats: 2,
        })
        expect(fileTransferResponse.ok).toBeTruthy()
      }
    }

    const startRestoreResponse = await apiDataTransferService.startDataTransfer(
      { dataTransferId: dataTransferId }
    )
    expect(startRestoreResponse.ok).toBeTruthy()
    let importResult = true
    while (importProgress < 100) {
      const checkRestoreResponse =
        await apiDataTransferService.checkDataTransfer({
          dataTransferId: dataTransferId,
        })
      if (checkRestoreResponse.ok) {
        importProgress = checkRestoreResponse.data.progress
      } else {
        importResult = false
        break
      }
      await delay(500)
    }
    if (errorExpected) {
      expect(importResult).toBeFalsy()
    } else {
      expect(importResult).toBeTruthy()
    }
  }
})

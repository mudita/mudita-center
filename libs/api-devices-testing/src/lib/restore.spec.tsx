/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { getEmptyTransferData, getFullTransferData } from "./helpers/file-transfer-data"
import { APIRestoreService, APIFileTransferService, ServiceBridge } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { delay } from "shared/utils"

jest.mock("shared/utils", () => {
  return {
    callRenderer: () => {},
    delay: () => { return new Promise((resolve) => setTimeout(resolve, 500))}  }
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

describe("Restore feature", () => {
  let deviceProtocol: DeviceProtocol
  let restoreFeatures: {
    feature: string
    key: string
  }[]

  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await fetchSupportedFeatures()
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should perform restore process for empty restore data", async () => {
    const base64Sources =  getEmptyTransferData()
    await performFullRestore(base64Sources)
  },30000)

  it("should perform restore process for restore data with one item per feature", async () => {
    const base64Sources = getFullTransferData()
    await performFullRestore(base64Sources)
  },30000)

  it("should perform restore process for every single feature", async () => {
    const base64Sources = getFullTransferData()
    for (const [feature, base64] of Object.entries(base64Sources)) {
      await performFullRestore({ [feature]: base64 })
    }
  },30000)


  //TODO - To consider getting this data from the config
  async function fetchSupportedFeatures() {
    restoreFeatures = [
      {feature: "CONTACTS_LIST", key: "CONTACTS_V1"},
      {feature: "CALL_LOG", key: "CALL_LOGS_V1"},
      {feature: "MESSAGES", key: "MESSAGES_V1"},
      {feature: "ALARMS", key: "ALARMS_V1"},
      {feature: "NOTES", key: "NOTES_V1"}
    ]
  }

  async function performFullRestore(base64Sources: { [key: string]: string } = {}) {
    const serviceBridge = new ServiceBridge()
    const filteredRestoreFeatures = restoreFeatures.filter(({ feature }) => (feature in base64Sources))
    let restoreProgress = 0
    let restoreId = -1
    let featuresResponse: { [key: string]: string } = {}

    const apiRestoreService = new APIRestoreService(deviceProtocol, serviceBridge)
    const apiTransferService = new APIFileTransferService(deviceProtocol, serviceBridge)

    const deleteTransferResponse = await apiTransferService.transferSendDelete({ transferId: -1 })

    const result = await apiRestoreService.preRestore({ features: filteredRestoreFeatures })
    expect(result.ok).toBeTruthy()
    if (result.ok) {
        expect(result.data.restoreId).toBeGreaterThan(0)
        expect(Object.keys(result.data.features).sort()).toEqual(filteredRestoreFeatures.map(item => item.feature).sort())
        expect(filteredRestoreFeatures.every(({ feature, key }) =>
            result.data.features[feature].endsWith(`${key.toLowerCase()}.json`)
        )).toBe(true)

        restoreId = result.data.restoreId
        featuresResponse = result.data.features
    }

    expect(restoreId).toBeGreaterThan(-1)
    expect(Object.keys(featuresResponse).length).toEqual(filteredRestoreFeatures.length)

    for (const [feature, featurePath] of Object.entries(featuresResponse)) {
        const base64Source = base64Sources[feature]
        const preTransferResponse = await apiTransferService.preTransferSend({ targetPath: featurePath, source: { base64: base64Source } })
        expect(preTransferResponse.ok).toBeTruthy()
        if (preTransferResponse.ok) {
            const fileTransferResponse = await apiTransferService.transferSend({
                transferId: preTransferResponse.data.transferId,
                chunkNumber: 1,
                repeats: 0,
                maxRepeats: 2
            })
            expect(fileTransferResponse.ok).toBeTruthy()
        }
    }

    const startRestoreResponse = await apiRestoreService.startRestore({ restoreId: restoreId })
    expect(startRestoreResponse.ok).toBeTruthy()
    
    while (restoreProgress < 100) {
        const checkRestoreResponse = await apiRestoreService.checkRestore({ restoreId: restoreId })
        expect(checkRestoreResponse.ok).toBeTruthy()
        if (checkRestoreResponse.ok) {
            restoreProgress = checkRestoreResponse.data.progress
        }
        await delay(500)
    }
  }
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
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
    const base64Sources =  getEmptyBackupData()
    await performFullRestore(base64Sources)
  },30000)

  it("should perform restore process for restore data with one item per feature", async () => {
    const base64Sources = getFullBackupData()
    await performFullRestore(base64Sources)
  },30000)

  it("should perform restore process for every single feature", async () => {
    const base64Sources = getFullBackupData()
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

  function getEmptyBackupData(): { [key: string]: string } {
    return {
      CONTACTS_LIST: "eyJkYXRhIjpbXX0",
      CALL_LOG: "eyJkYXRhIjpbXX0",
      MESSAGES: "eyJkYXRhIjpbXX0",
      ALARMS: "eyJkYXRhIjpbXX0",
      NOTES: "eyJkYXRhIjpbXX0",
    }
  }

  function getFullBackupData(): { [key: string]: string } {
    return {
      CONTACTS_LIST: "eyJkYXRhIjpbeyJpZCI6IjIzIiwiZmlyc3ROYW1lIjoiUmlsZXkiLCJsYXN0TmFtZSI6IkFndWlycmUiLCJwaG9uZU51bWJlcnMiOlt7ImlkIjoxNzcsInR5cGUiOiJob21lIiwidmFsdWUiOiI5NjY1NDUwNTk3IiwicHJlZmVyZW5jZSI6MH1dLCJlbWFpbEFkZHJlc3NlcyI6W3siaWQiOjE3OCwidHlwZSI6Im90aGVyIiwidmFsdWUiOiJwYXR0b25zeWRuZXlAZ3JhaGFtLmNvbSIsInByZWZlcmVuY2UiOjF9XSwiYWRkcmVzc2VzIjpbeyJ0eXBlIjoiaG9tZSIsImNpdHkiOiJFYXN0IFNhbGx5IiwiY291bnRyeSI6IlNlbmVnYWwifV0sIm9yZ2FuaXphdGlvbnMiOlt7Im5hbWUiOiJIaWNrcyBQTEMifV0sIm5vdGUiOiJJbmRleDogNDAwXG5DdXN0b21lciBJZDogYzg2ZUJjQzVDRTIzZjFFXG5QaG9uZSAxOiAwMDEtNTAwLTA1Ny01MDQxeDQ2ODgxXG5TdWJzY3JpcHRpb24gRGF0ZTogMjAyMi0wNS0wN1xuIiwidXJscyI6W3sidmFsdWUiOiJodHRwczovL3RhcGlhLWVyaWNrc29uLmNvbS8iLCJwcmVmZXJlbmNlIjoxfV0sInZlcnNpb24iOjAsInN0YXJyZWQiOmZhbHNlfV19",
      CALL_LOG: "eyJkYXRhIjpbeyJwaG9uZSI6IjUxMjM3MDAxNCIsImNhbGxEYXRlIjoxNzM2OTQ0OTc4MzQ3LCJjYWxsRHVyYXRpb24iOjAsImNhbGxUeXBlIjoiVFlQRV9PVVRHT0lORyIsImlzUmVhZCI6ZmFsc2UsInByZXNlbnRhdGlvbiI6IlBSRVNFTlRBVElPTl9BTExPV0VEIn0seyJwaG9uZSI6IjYwMDYwMTAwMDkiLCJjYWxsRGF0ZSI6MTMxMDM0MjQwMDAwMCwiY2FsbER1cmF0aW9uIjozMCwiY2FsbFR5cGUiOiJUWVBFX1ZPSUNFTUFJTCIsImlzUmVhZCI6dHJ1ZSwicHJlc2VudGF0aW9uIjoiUFJFU0VOVEFUSU9OX0FMTE9XRUQifV19",
      MESSAGES: "eyJkYXRhIjpbeyJpZCI6IjEiLCJ0aHJlYWRJZCI6IjUiLCJhZGRyZXNzIjpbeyJhZGRyZXNzIjoiNjAwNjAwOTg3In1dLCJib2R5IjoiQ3p5IHNtcyBkb3Rhcmw/IiwiZGF0ZSI6MTczMDExNjQyMTAwMCwidHlwZSI6IlNNUyIsInN0YXR1cyI6IlNFTlQiLCJyZWFkIjp0cnVlLCJzZWVuIjp0cnVlLCJkZWxpdmVyeVN0YXR1cyI6IkRFTElWRVJFRCJ9XX0",
      ALARMS: "eyJkYXRhIjpbeyJpZCI6MywibmFtZSI6IkFsYXJtIiwiem9uZUlkIjoiRXVyb3BlL1dhcnNhdyIsInJlcGVhdERheXMiOltdLCJzb3VuZE5hbWUiOiJTdW5yaXNlIEd1aXRhciIsImlzRW5hYmxlZCI6dHJ1ZSwiaG91ciI6OCwibWludXRlIjowfV19",
      NOTES: "eyJkYXRhIjpbeyJpZCI6MywidGl0bGUiOiJUZXN0IiwiY29udGVudCI6IiIsImlzUGlubmVkIjpmYWxzZSwiY3JlYXRlRGF0ZSI6MTczNzAwOTI3MDY2OCwidXBkYXRlRGF0ZSI6MTczODE1Njc0MDUyOH1dfQ"
    }
  }

})

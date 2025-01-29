/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIRestoreService, ServiceBridge } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
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

  it("should return valid paths for all supported features", async () => {
    const apiConfigService = new APIRestoreService(deviceProtocol, new ServiceBridge())

    const result = await apiConfigService.preRestore({features: restoreFeatures})
    console.log(result)
    expect(result.ok).toBeTruthy()
    if(result.ok){
      expect(result.data.restoreId).toBeGreaterThan(0)
      expect(Object.keys(result.data.features).length).toEqual(restoreFeatures.length)
      expect(Object.keys(result.data.features).sort()).toEqual(restoreFeatures.map(item => item.feature).sort())
      expect(restoreFeatures.every(({ feature, key }) => 
        result.data.features[feature].endsWith(`${key.toLowerCase()}.json`)
      )).toBe(true);
    }
  })

  async function fetchSupportedFeatures() {
    restoreFeatures = [
      {feature: "CONTACTS_LIST", key: "CONTACTS_V1"},
      {feature: "CALL_LOG", key: "CALL_LOGS_V1"},
      {feature: "MESSAGES", key: "MESSAGES_V1"},
      {feature: "ALARMS", key: "ALARMS_V1"},
      {feature: "NOTES", key: "NOTES_V1"}
    ]
  }

})

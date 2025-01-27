/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIFeaturesService } from "device/feature"
import {
  generateMcAboutLayout,
  generateMcOverviewLayout,
} from "generic-view/views"

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
    }
  }
})

describe("Feature Configuration and Data", () => {
  let deviceProtocol: DeviceProtocol | undefined = undefined
  const genericFeatures = ["contacts","mc-data-migration","fileManager"]
  const notSupportedDataFeatures = ["contacts", "mc-data-migration"]

  function validateDeviceProtocol(deviceProtocol: any) {
    expect(deviceProtocol?.devices).toHaveLength(1);
    expect(deviceProtocol).toBeTruthy();
    
    if (deviceProtocol === undefined) {
      return;
    }
  
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id);
  }
  

  beforeEach(async () => {
    deviceProtocol = await setKompaktConnection()
    validateDeviceProtocol(deviceProtocol)
  })

  afterEach(async () => {
    await deviceProtocol?.activeDevice?.disconnect()
  }, 10000)

  it("should receive valid configuration for mc-overview feature", async() => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)

    const result = await apiFeaturesService.getOverviewFeatureConfiguration()
    expect(result.ok).toBeTruthy()
  })

  it.each(genericFeatures)("should receive valid configuration for %s feature", async (feature) => {
    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)

    const result = await apiFeaturesService.getFeatureConfiguration({feature: feature})
    expect(result.ok).toBeTruthy()
  })

  it("should return error for invalid feature", async() => {
    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)
    const result = await apiFeaturesService.getFeatureConfiguration({feature: "dummyFeature"})
    expect(result.ok).toBeFalsy()
  })

  it("should receive valid data for ms-overview feature", async() => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)
    const response = await apiFeaturesService.getOverviewFeatureConfiguration()
    expect(response.ok).toBeTruthy()
    if(response.ok){
      const overview = generateMcOverviewLayout(response.data)
      const about = generateMcAboutLayout(response.data)
      const result = await apiFeaturesService.getOverviewData({
        overview: overview,
        about: about
      })
      expect(result.ok).toBeTruthy()
    }
  })
  
  it.each(genericFeatures.filter(feature => !notSupportedDataFeatures.includes(feature)))("should receive valid data for %s feature", async(feature) => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)

    const result = await apiFeaturesService.getFeatureData({feature})
    expect(result.ok).toBeTruthy()
  })

  it.each(notSupportedDataFeatures)("should receive error data for %s feature", async(feature) => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)

    const result = await apiFeaturesService.getFeatureData({feature})
    expect(result.ok).toBeFalsy()
  })

})

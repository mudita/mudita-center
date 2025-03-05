/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIFeaturesService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import {
  generateMcAboutLayout,
  generateMcOverviewLayout,
} from "generic-view/views"
import { getApiFeaturesAndEntityTypes } from "./helpers/api-configuration-data"

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

describe("Feature Configuration and Data", () => {
  let deviceProtocol: DeviceProtocol
  let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }
  const notSupportedDataFeatures: string[] = ["dummy-feature"]

  beforeAll(async () => {
    console.log("xxx")
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(deviceProtocol)
    console.log(featuresAndEntityTypes)
    await deviceProtocol.activeDevice?.disconnect()
  })

  beforeEach(async () => {
    deviceProtocol = await setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol?.activeDevice?.disconnect()
  }, 10000)

  it("should receive valid configuration for mc-overview feature", async () => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)

    const result = await apiFeaturesService.getOverviewFeatureConfiguration()
    expect(result.ok).toBeTruthy()
  })

  it("should have features defined", () => {
    expect(featuresAndEntityTypes.features).toBeDefined()
    expect(featuresAndEntityTypes.features.length).toBeGreaterThan(0)
  })

  it("should receive valid configuration for %s feature", async () => {
    for (const feature of featuresAndEntityTypes.features) {
      if (deviceProtocol === undefined) {
        return
      }

      deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

      const apiFeaturesService = new APIFeaturesService(deviceProtocol)

      const result = await apiFeaturesService.getFeatureConfiguration({
        feature: feature,
      })
      console.log(result)
      expect(result.ok).toBeTruthy()
    }
  })

  it("should return error for invalid feature", async () => {
    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)
    const result = await apiFeaturesService.getFeatureConfiguration({
      feature: "dummyFeature",
    })
    expect(result.ok).toBeFalsy()
  })

  it("should receive valid data for ms-overview feature", async () => {
    if (deviceProtocol === undefined) {
      return
    }
    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiFeaturesService = new APIFeaturesService(deviceProtocol)
    const response = await apiFeaturesService.getOverviewFeatureConfiguration()
    expect(response.ok).toBeTruthy()
    if (response.ok) {
      const overview = generateMcOverviewLayout(response.data)
      const about = generateMcAboutLayout(response.data)
      const result = await apiFeaturesService.getOverviewData({
        overview: overview,
        about: about,
      })
      expect(result.ok).toBeTruthy()
    }
  })

  // it.each(
  //   featuresAndEntityTypes.features.filter(
  //     (feature) => !notSupportedDataFeatures.includes(feature)
  //   )
  // )("should receive valid data for %s feature", async (feature) => {
  //   if (deviceProtocol === undefined) {
  //     return
  //   }
  //   deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

  //   const apiFeaturesService = new APIFeaturesService(deviceProtocol)

  //   const result = await apiFeaturesService.getFeatureData({ feature })
  //   expect(result.ok).toBeTruthy()
  // })

  it.each(notSupportedDataFeatures)(
    "should return error for %s feature",
    async (feature) => {
      if (deviceProtocol === undefined) {
        return
      }
      deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

      const apiFeaturesService = new APIFeaturesService(deviceProtocol)

      const result = await apiFeaturesService.getFeatureData({ feature })
      expect(result.data).toMatch(/EndpointNotExistException/)
    }
  )
})

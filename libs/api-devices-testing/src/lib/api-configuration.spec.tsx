/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIConfigService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { ApiConfig, GeneralError } from "device/models"
import { VendorID, ProductID } from "Core/device/constants"

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

describe("API configuration", () => {
  let deviceProtocol: DeviceProtocol
  const genericFeatures = [
    "mc-overview",
    "mc-contacts",
    "mc-data-migration",
    "mc-file-manager-internal",
  ].sort()

  const optionalFeatures = ["mc-file-manager-external"].sort()

  const testEntityTypes = [
    "contacts",
    "audioFiles",
    "imageFiles",
    "ebookFiles",
    "applicationFiles",
  ].sort()

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should receive API configuration", async () => {
    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()

    expect(result.ok).toBeTruthy()
  })

  it("should receive API configuration error on invalid deviceId", async () => {
    expect(deviceProtocol?.devices).toHaveLength(1)

    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig("dummyID")
    expect(result.ok).toBeFalsy()
    expect(result.error?.type).toBe(GeneralError.NoDevice)
  })

  it("should receive valid API configuration response", async () => {
    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()

    const apiConfig = result.data as ApiConfig

    optionalFeatures.forEach((feature) => {
      if (
        apiConfig.features.includes(feature) &&
        !genericFeatures.includes(feature)
      ) {
        genericFeatures.push(feature)
        genericFeatures.sort()
      }
    })

    expect(apiConfig.apiVersion).toMatch(/^\d+\.\d+\.\d+$/)
    expect(apiConfig.osVersion).toMatch(/^MuditaOS K/)
    expect(apiConfig.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    expect(apiConfig.variant?.length).toBeGreaterThan(0)
    expect(apiConfig.features.sort()).toEqual(genericFeatures)
    expect(apiConfig.entityTypes?.sort()).toEqual(testEntityTypes)
    expect(apiConfig.productId).toEqual(ProductID.MuditaKompaktChargeHex)
    expect(apiConfig.vendorId).toEqual(VendorID.MuditaKompaktHex)
    expect(apiConfig.serialNumber).toMatch(/^[A-Z0-9]{13}$/)
    expect(apiConfig.otaApiConfig?.otaApiKey.length).toEqual(15)
    expect(
      apiConfig.otaApiConfig?.osVersionTimestamp.toString().length
    ).toEqual(10)
  })
})

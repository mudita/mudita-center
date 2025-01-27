/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { setActiveDevice } from "./helpers/protocol-validator"
import { APIConfigService, APIEntitiesService, ServiceBridge } from "device/feature"
import { ApiConfig } from "device/models"

jest.mock("shared/utils", () => {
  return { 
    callRenderer: () => {}, 
    delay: () => { return new Promise((resolve) => setTimeout(resolve, 500))} }
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

describe("Entities configuration, metadata and data", () => {
  let deviceProtocol: DeviceProtocol
  let entityTypes: string[]

  async function fetchSupportedEntities(){
    const apiConfigService = new APIConfigService(deviceProtocol)
    const result = await apiConfigService.getAPIConfig()
    const apiConfig = result.data as ApiConfig
    entityTypes = apiConfig.entityTypes ?? []
    expect(entityTypes.length).toBeGreaterThan(0)
  }



  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await fetchSupportedEntities()
    await deviceProtocol.activeDevice?.disconnect()
  },10000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should return successful response for entity configuration", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)
  
    for (const entityType of entityTypes) {
     
      const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())
      const result = await service.getEntitiesConfiguration({ entitiesType: entityType })
  
      expect(result).toBeDefined()
      expect(result.ok).toBeTruthy()
    }
  })

  it("should return successful response for entity metadata", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)
  
    for (const entityType of entityTypes) {
      const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())
      const result = await service.getEntitiesMetadata({ entitiesType: entityType })
  
      expect(result).toBeDefined()
      expect(result.ok).toBeTruthy()
    }
  })

  it("should return successful response for entity data", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)
  
    for (const entityType of entityTypes) {
      const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())
      const result = await service.getEntitiesData({ entitiesType: entityType, responseType: "file" })
      
      expect(result).toBeDefined()
      expect(result.ok).toBeTruthy()
    }
  },20000)
  
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiConfigResponseValidator,
  ApiDevice,
  buildApiConfigRequest,
  buildEntitiesFileDataRequest,
  entitiesReadyResponseSchema,
  GetEntitiesDataResponseValidator,
} from "devices/api-device/models"
import { AppSerialPortService } from "app-serialport/main"
import { getApiDevice } from "./helpers/get-api-device"
import { getSerialPortService } from "./helpers/get-serial-port-service"
import { withBodyStatus } from "./helpers/with-body-status"

let device: ApiDevice
let serialPortService: AppSerialPortService

describe("Entities configuration, metadata and data", () => {
  let entityTypes: string[]

  async function fetchSupportedEntities() {
    const result = await serialPortService.request(device.id, {
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })
    const apiConfig = ApiConfigResponseValidator.parse(result.body)
    entityTypes = apiConfig.entityTypes ?? []
    expect(entityTypes.length).toBeGreaterThan(0)
  }

  beforeAll(async () => {
    device = await getApiDevice()
    serialPortService = await getSerialPortService()
    await fetchSupportedEntities()
  }, 10000)

  afterAll(async () => {
    serialPortService.close(device.id)
  })

  it("should return successful response for entity configuration", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await serialPortService.request(device.id, {
        ...buildEntitiesFileDataRequest({
          entityType,
          responseType: "file",
        }),
        options: { timeout: 5000 },
      })


      const enriched = withBodyStatus(result)
      const entitiesFileData = GetEntitiesDataResponseValidator.parse(
        enriched.body
      )

      expect(entitiesFileData).toBeDefined()
      expect(result.status).toBeDefined()
    }
  })

  it("should return successful response for entity metadata", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await serialPortService.request(device.id, {
        endpoint: "ENTITIES_METADATA",
        method: "GET",
        body: {
          entityType,
        },
      })
      expect(result.status).toBeDefined()
    }
  }, 10_000)

  it("should return successful response for entity data", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      let progress = 0
      let status = 0

      const createEntitiesResult = await serialPortService.request(device.id, {
        endpoint: "ENTITIES_DATA",
        method: "GET",
        body: {
          entityType,
          responseType: "file",
          action: "create",
        },
      })


      expect(createEntitiesResult.status).toBe(200)

      while (status !== 200) {
        const getEntitiesResult = await serialPortService.request(device.id, {
          endpoint: "ENTITIES_DATA",
          method: "GET",
          body: {
            entityType,
            responseType: "file",
            action: "get",
          },
        })


        expect(getEntitiesResult.status).toBeDefined()

        if (getEntitiesResult.status === 200) {
          const enriched = withBodyStatus(getEntitiesResult)
          const data = entitiesReadyResponseSchema.parse(enriched.body)
          progress = data.progress!
          status = getEntitiesResult.status
        }
      }
      expect(progress).toBe(100)
      expect(status).toBe(200)
    }
  }, 30_000)
})

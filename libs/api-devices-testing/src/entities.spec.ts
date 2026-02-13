/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { delay } from "app-utils/common"
import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
  buildEntitiesConfigGetRequest,
  entitiesReadyResponseSchema,
} from "devices/api-device/models"
import { withBodyStatus } from "./helpers/with-body-status"
import { ApiDeviceTestService } from "./helpers/api-device-test-service"

let service: ApiDeviceTestService

describe("Entities configuration, metadata and data", () => {
  let entityTypes: string[]

  const fetchSupportedEntities = async () => {
    const result = await service.request({
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })
    const apiConfig = ApiConfigResponseValidator.parse(result.body)
    entityTypes = apiConfig.entityTypes ?? []
    expect(entityTypes.length).toBeGreaterThan(0)
  }

  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
    await fetchSupportedEntities()
  }, 30_000)

  afterEach(async () => {
    await service.reset()
  }, 30_000)

  it("should return successful response for entity configuration", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await service.request(
        buildEntitiesConfigGetRequest({
          entityType,
        })
      )

      expect(result.status).toBe(200)
    }
  })

  it("should return successful response for entity metadata", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await service.request({
        endpoint: "ENTITIES_METADATA",
        method: "GET",
        body: {
          entityType,
        },
      })
      expect(result.status).toBeDefined()
    }
  }, 30_000)

  it("should return successful response for entity data", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      let progress = 0
      let status = 0

      const createEntitiesResult = await service.request({
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
        await delay(500)
        const getEntitiesResult = await service.request({
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
          // sometimes filePath is missing in the response // TODO: fix it in the device API?
          const data = entitiesReadyResponseSchema.parse(enriched.body)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          progress = data.progress!
          status = getEntitiesResult.status
        }
      }
      expect(progress).toBe(100)
      expect(status).toBe(200)
    }
  }, 30_000)
})

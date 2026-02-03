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
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext

describe("Entities configuration, metadata and data", () => {
  let entityTypes: string[]

  async function fetchSupportedEntities() {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(deviceId, {
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })
    const apiConfig = ApiConfigResponseValidator.parse(result.body)
    entityTypes = apiConfig.entityTypes ?? []
    expect(entityTypes.length).toBeGreaterThan(0)
  }

  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    await fetchSupportedEntities()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should return successful response for entity configuration", async () => {
    const { service, deviceId } = apiDeviceContext
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await service.request(
        deviceId,
        buildEntitiesConfigGetRequest({
          entityType,
        })
      )

      expect(result.status).toBe(200)
    }
  })

  it("should return successful response for entity metadata", async () => {
    const { service, deviceId } = apiDeviceContext
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const result = await service.request(deviceId, {
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
    const { service, deviceId } = apiDeviceContext
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      let progress = 0
      let status = 0

      const createEntitiesResult = await service.request(deviceId, {
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
        const getEntitiesResult = await service.request(deviceId, {
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
          progress = data.progress!
          status = getEntitiesResult.status
        }
      }
      expect(progress).toBe(100)
      expect(status).toBe(200)
    }
  }, 30_000)
})

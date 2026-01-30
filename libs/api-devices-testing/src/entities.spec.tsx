/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { delay } from "app-utils/common"
import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
  buildEntitiesFileDataRequest,
  entitiesReadyResponseSchema,
  GetEntitiesDataResponseValidator,
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
      // Sometimes the first request returns 202, so we retry until we get 200
      // const result = await service.request(deviceId, {
      //   ...buildEntitiesFileDataRequest({
      //     entityType,
      //     responseType: "file",
      //   }),
      //   options: { timeout: 5000 },
      // })

      const result = await waitForEntitiesFile200(service, deviceId, {
        entityType,
        responseType: "file",
      })

      const enriched = withBodyStatus(result)
      const entitiesFileData = GetEntitiesDataResponseValidator.parse(
        enriched.body
      )

      expect(entitiesFileData).toBeDefined()
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

        console.log(
          `Entity Type: ${entityType}, Get Entities Status: ${getEntitiesResult.status}`
        )
        console.log(
          `Entity Type: ${entityType}, Get Entities Body: ${JSON.stringify(getEntitiesResult.body)}`
        )

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

async function waitForEntitiesFile200(
  service: ApiDeviceContext["service"],
  deviceId: string,
  {
    entityType,
    responseType,
    attempts = 50,
    delayMs = 500,
  }: {
    entityType: string
    responseType: "file"
    attempts?: number
    delayMs?: number
  }
) {
  const result = await service.request(deviceId, {
    ...buildEntitiesFileDataRequest({
      entityType,
      responseType,
    }),
    options: { timeout: 5000 },
  })

  if (result.status === 200) {
    return result
  }

  if (result.status === 202) {
    if (attempts <= 1) {
      throw new Error(
        `ENTITIES_DATA did not reach status 200 after max attempts for entityType=${entityType}`
      )
    }

    await delay(delayMs)

    return waitForEntitiesFile200(service, deviceId, {
      entityType,
      responseType,
      attempts: attempts - 1,
      delayMs,
    })
  }

  throw new Error(
    `Unexpected status ${result.status} while waiting for ENTITIES_DATA 200 for entityType=${entityType}`
  )
}

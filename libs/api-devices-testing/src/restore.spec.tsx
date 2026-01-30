/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { crc32 } from "node:zlib"
import {
  buildFileTransferDeleteRequest,
  buildFileTransferPostRequest,
  buildPreFileTransferPostRequest,
  buildPreRestoreRequest,
  buildRestoreGetRequest,
  buildRestorePostRequest,
  PreFileTransferPostResponseValidator,
  PreRestoreResponseValidator,
  RestoreResponseValidator,
} from "devices/api-device/models"
import random from "lodash/random"
import { delay } from "app-utils/common"
import {
  getEmptyTransferData,
  getFullTransferData,
} from "./helpers/file-transfer-data"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"
import { withBodyStatus } from "./helpers/with-body-status"

let apiDeviceContext: ApiDeviceContext
let restoreFeatures: {
  feature: string
  key: string
}[]

describe("Restore feature", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    await fetchSupportedFeatures()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should perform restore process for empty restore data", async () => {
    const base64Sources = getEmptyTransferData()
    await performFullRestore(base64Sources)
  }, 30000)

  it("should perform restore process for restore data with one item per feature", async () => {
    const base64Sources = getFullTransferData()
    await performFullRestore(base64Sources)
  }, 30000)

  it("should perform restore process for every single feature", async () => {
    const base64Sources = getFullTransferData()
    for (const [feature, base64] of Object.entries(base64Sources)) {
      await performFullRestore({ [feature]: base64 })
    }
  }, 30000)

  //TODO - To consider getting this data from the config
  async function fetchSupportedFeatures() {
    restoreFeatures = [
      { feature: "CONTACTS_LIST", key: "CONTACTS_V1" },
      { feature: "CALL_LOG", key: "CALL_LOGS_V1" },
      { feature: "MESSAGES", key: "MESSAGES_V1" },
      { feature: "ALARMS", key: "ALARMS_V1" },
      { feature: "NOTES", key: "NOTES_V1" },
    ]
  }

  async function performFullRestore(
    base64Sources: { [key: string]: string } = {}
  ) {
    const { deviceId, service } = apiDeviceContext

    const filteredRestoreFeatures = restoreFeatures.filter(
      ({ feature }) => feature in base64Sources
    )
    let restoreProgress = 0
    let restoreId: number
    let featuresResponse: { [key: string]: string } = {}

    await service.request(
      deviceId,
      buildFileTransferDeleteRequest({
        fileTransferId: -1,
      })
    )
    restoreId = random(1, 100000)
    const result = await service.request(
      deviceId,
      buildPreRestoreRequest({
        restoreId,
        features: filteredRestoreFeatures,
      })
    )
    const preRestoreData = PreRestoreResponseValidator.parse(result.body)
    expect(result.status).toBe(200)
    if (result.status === 200) {
      expect(preRestoreData.restoreId).toBeGreaterThan(0)
      expect(Object.keys(preRestoreData.features).sort()).toEqual(
        filteredRestoreFeatures.map((item) => item.feature).sort()
      )
      expect(
        filteredRestoreFeatures.every(({ feature, key }) =>
          preRestoreData.features[feature].endsWith(`${key.toLowerCase()}.json`)
        )
      ).toBe(true)

      restoreId = preRestoreData.restoreId
      featuresResponse = preRestoreData.features
    }

    expect(restoreId).toBeGreaterThan(-1)
    expect(Object.keys(featuresResponse).length).toEqual(
      filteredRestoreFeatures.length
    )

    for (const [feature, featurePath] of Object.entries(featuresResponse)) {
      const base64Source = base64Sources[feature]
      const crc = (crc32(base64Source) >>> 0)
        .toString(16)
        .toLowerCase()
        .padStart(8, "0")

      const preTransferResponse = await service.request(
        deviceId,
        buildPreFileTransferPostRequest({
          filePath: featurePath,
          fileSize: base64Source.length,
          crc32: crc,
        })
      )

      expect(preTransferResponse.status).toBe(200)
      const preFileTransferPostResponseData =
        PreFileTransferPostResponseValidator.parse(preTransferResponse.body)
      if (preTransferResponse.status === 200) {
        const chunkNumber = 0
        const chunkSize = preFileTransferPostResponseData.chunkSize
        const data = base64Source.slice(
          chunkNumber * chunkSize,
          (chunkNumber + 1) * chunkSize
        )
        const fileTransferResponse = await service.request(
          deviceId,
          buildFileTransferPostRequest({
            transferId: preFileTransferPostResponseData.transferId,
            chunkNumber: chunkNumber + 1,
            data,
          })
        )
        expect(fileTransferResponse.status).toBe(200)
      }
    }

    const startRestoreResponse = await service.request(
      deviceId,
      buildRestorePostRequest({
        restoreId: restoreId,
      })
    )
    expect(startRestoreResponse.status).toBe(202)

    while (restoreProgress < 100) {
      const checkRestoreResponse = await service.request(
        deviceId,
        buildRestoreGetRequest({
          restoreId: restoreId,
        })
      )

      expect([200, 202]).toContain(checkRestoreResponse.status)
      const enriched = withBodyStatus(checkRestoreResponse)
      const checkRestoreData = RestoreResponseValidator.parse(enriched.body)
      if (checkRestoreResponse.status === 200 || checkRestoreResponse.status === 202) {
        restoreProgress = checkRestoreData.progress ?? 0
      }
      await delay(500)
    }
  }
})

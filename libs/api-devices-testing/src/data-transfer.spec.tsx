/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { crc32 } from "node:zlib"
import random from "lodash/random"
import {
  buildDataTransferGetRequest,
  buildDataTransferPostRequest,
  buildFileTransferDeleteRequest,
  buildFileTransferPostRequest,
  buildPreDataTransferPostRequest,
  buildPreFileTransferPostRequest,
  DataTransferGetResponseValidator200,
  DataTransferGetResponseValidator202,
  PreDataTransferPostResponseValidator,
  PreFileTransferPostResponseValidator,
} from "devices/api-device/models"
import { delay } from "app-utils/common"
import {
  getEmptyTransferData,
  getFullTransferData,
  getInvalidTransferData,
} from "./helpers/file-transfer-data"
import { withBodyStatus } from "./helpers/with-body-status"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext
let importFeatures: {
  feature: string
  key: string
}[]

describe("Data transfer", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    await fetchSupportedFeatures()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should perform import process for empty restore data", async () => {
    const base64Sources = getEmptyTransferData()
    await performDataTransfer(base64Sources, false)
  }, 30000)

  it("should perform import process for restore data with one item per feature", async () => {
    const base64Sources = getFullTransferData()
    await performDataTransfer(base64Sources, false)
  }, 30000)

  it("should perform import process for every single feature", async () => {
    const base64Sources = getFullTransferData()
    for (const [feature, base64] of Object.entries(base64Sources)) {
      await performDataTransfer({ [feature]: base64 }, false)
    }
  }, 30000)

  it("should return error on invalid data for features", async () => {
    const base64Sources = getInvalidTransferData()
    await performDataTransfer(base64Sources, true)
  }, 30000)

  //TODO - To consider getting this data from the config
  async function fetchSupportedFeatures() {
    importFeatures = [
      { feature: "CONTACTS_LIST", key: "contacts-v1" },
      { feature: "CALL_LOG", key: "callLog-v1" },
      { feature: "MESSAGES", key: "messages-v1" },
      { feature: "ALARMS", key: "alarms-v1" },
      { feature: "NOTES", key: "notes-v1" },
    ]
  }

  async function performDataTransfer(
    base64Sources: { [key: string]: string } = {},
    errorExpected: boolean
  ) {
    const { service, deviceId } = apiDeviceContext
    const filteredRestoreFeatures = importFeatures.filter(
      ({ feature }) => feature in base64Sources
    )
    let importProgress = 0
    let dataTransferId = random(1, 100000)
    let domainsResponse: { [key: string]: string } = {}

    await service.request(
      deviceId,
      buildFileTransferDeleteRequest({
        fileTransferId: -1,
      })
    )

    const startPreDataTransferResponse = await service.request(
      deviceId,
      buildPreDataTransferPostRequest({
        dataTransferId: dataTransferId,
        domains: filteredRestoreFeatures.map((item) => item.key),
      })
    )

    const startPreDataTransferResponseData =
      PreDataTransferPostResponseValidator.parse(
        startPreDataTransferResponse.body
      )

    expect(startPreDataTransferResponse.status).toBe(200)
    if (startPreDataTransferResponse.status === 200) {
      expect(startPreDataTransferResponseData.dataTransferId).toBeGreaterThan(0)

      dataTransferId = startPreDataTransferResponseData.dataTransferId
      domainsResponse = startPreDataTransferResponseData.domains
    }

    expect(dataTransferId).toBeGreaterThan(0)
    expect(Object.keys(domainsResponse).length).toEqual(
      filteredRestoreFeatures.length
    )

    for (const [feature, featurePath] of Object.entries(domainsResponse)) {
      const foundFeature = importFeatures.find((item) => item.key === feature)
      expect(foundFeature).toBeDefined()
      if (foundFeature === undefined) {
        break
      }
      const base64Source = base64Sources[foundFeature.feature]

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

    const buildDataTransferPostResponse = await service.request(
      deviceId,
      buildDataTransferPostRequest({
        dataTransferId: dataTransferId,
      })
    )

    let importResult = true
    while (importProgress < 100) {
      const checkDataTransferResponse = await service.request(
        deviceId,
        buildDataTransferGetRequest({
          dataTransferId: dataTransferId,
        })
      )

      if (
        checkDataTransferResponse.status === 200 ||
        checkDataTransferResponse.status === 202
      ) {
        const enriched = withBodyStatus(checkDataTransferResponse)
        importProgress =
          checkDataTransferResponse.status === 200
            ? (DataTransferGetResponseValidator200.parse(enriched.body)
                .progress ?? 0)
            : (DataTransferGetResponseValidator202.parse(enriched.body)
                .progress ?? 0)
      } else {
        importResult = false
        break
      }
      await delay(50)
    }
    if (errorExpected) {
      expect(importResult).toBeFalsy()
    } else {
      expect(importResult).toBeTruthy()
    }
  }
})

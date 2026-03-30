/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { buildApiTestToolsGetRequestValidator } from "devices/api-device/models"
import { getService } from "./helpers/api-device-test-service"

const BASE_CHUNK_SIZE = 1024 * 14 // 14 KB

describe("Measures speed of serialport data transfer", () => {
  const factors = [1, 5, 8, 10, 15, 20, 50, 80] // Chunk size factors

  it.each(factors)(
    "5 MB of data with factor %i",
    async (factor) => {
      const sizeInMB = 5
      const maxChunkSize = BASE_CHUNK_SIZE * factor
      const totalDataSizeB = sizeInMB * 1024 ** 2
      const data = "a".repeat(totalDataSizeB)

      const chunks = data.match(new RegExp(`.{1,${maxChunkSize}}`, "g")) || []

      const startTime = performance.now()

      for (const chunk of chunks) {
        await getService().request({
          ...buildApiTestToolsGetRequestValidator({
            action: "send-serial-port-test-data",
            data: chunk,
          }),
          options: { timeout: 5_000, retries: 3 },
        })
      }

      const endTime = performance.now()
      const durationSeconds = (endTime - startTime) / 1000
      const throughputMB = totalDataSizeB / 1024 ** 2 / durationSeconds

      console.log(`Serial port data transfer performance for ${sizeInMB} MB with factor ${factor}:
  Transferred data size: ${(totalDataSizeB / 1024 ** 2).toFixed(2)} MB
  Chunk size: ${(maxChunkSize / 1024).toFixed(2)} KB
  Last chunk size: ${(chunks[chunks.length - 1].length / 1024).toFixed(2)} KB
  Chunks count: ${chunks.length}
  Total time: ${durationSeconds.toFixed(2)} seconds
  Throughput: ${throughputMB.toFixed(2)} MB/s`)
    },
    60_000 * 60 // 1 hour
  )
})

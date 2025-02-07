/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../libs/e2e-mock/client/src/lib/e2e-mock-client"
import { generateUniqueNumber } from "./utils/generate-unique-number-id.helper"
import { generateBase64Info } from "./utils/generate-base-64-info.helper"

interface mockEntityDownloadProcessOptions {
  path: string
  entityType: string
  data: Record<string, unknown>[]
}

export const mockEntityDownloadProcess = ({
  path,
  entityType,
  data,
}: mockEntityDownloadProcessOptions) => {
  const { base64, sizeInBytes, crc32Hex } = generateBase64Info({ data })
  const totalEntities = data.length
  const transferId = generateUniqueNumber()

  E2EMockClient.mockResponses([
    {
      path,
      body: { totalEntities, uniqueKey: "1733750368390" },
      match: {
        expected: {
          entityType: entityType,
        },
      },
      endpoint: "ENTITIES_METADATA",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        filePath: `../${entityType}_entities.json`,
        progress: 100,
      },
      match: {
        expected: {
          entityType: entityType,
          responseType: "file",
        },
      },
      endpoint: "ENTITIES_DATA",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: `../${entityType}_entities.json`,
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
  ])
}

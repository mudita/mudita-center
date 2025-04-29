/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateUniqueNumber } from "./utils/generate-unique-number-id.helper"
import { generateBase64Info } from "./utils/generate-base-64-info.helper"
import { AddKompaktResponse } from "e2e-mock-server"

export function prepareMockForFileTransfer(
  path: string,
  data: string,
  filePath: string
): AddKompaktResponse[] {
  const { base64, sizeInBytes, crc32Hex } = generateBase64Info({ data })
  const transferId = generateUniqueNumber()

  return [
    {
      path,
      body: {
        transferId: transferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath,
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: transferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: transferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
  ]
}

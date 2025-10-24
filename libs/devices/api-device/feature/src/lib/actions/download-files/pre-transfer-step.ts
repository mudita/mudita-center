/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  PreFileTransferGetRequest,
  PreFileTransferReadyGetResponse,
} from "devices/api-device/models"
import { preGetFileTransfer } from "../../api/pre-get-file-transfer"

interface PreTransferParams {
  device: ApiDevice
  sourceFilePath: PreFileTransferGetRequest["filePath"]
  abortController: AbortController
}

export const preTransferStep = async ({
  device,
  sourceFilePath,
  abortController,
}: PreTransferParams) => {
  const preTransferResponse = await preGetFileTransfer(device, {
    filePath: sourceFilePath,
  })

  if (!preTransferResponse.ok) {
    throw new Error("Failed to initiate file transfer")
  }

  let transferData: Partial<PreFileTransferReadyGetResponse> = {}

  if (preTransferResponse.status === 200) {
    transferData = preTransferResponse.body
  } else if (preTransferResponse.status === 202) {
    let preTransferResponseStatus: 200 | 202 = 202

    while (preTransferResponseStatus === 202) {
      if (abortController.signal.aborted) {
        throw new Error("File transfer aborted")
      }
      const loopedPreTransferResponse = await preGetFileTransfer(device, {
        filePath: sourceFilePath,
      })
      if (!loopedPreTransferResponse.ok) {
        throw new Error("Failed to get file transfer progress")
      }
      if (loopedPreTransferResponse.status === 200) {
        transferData = loopedPreTransferResponse.body
      }
      preTransferResponseStatus = loopedPreTransferResponse.status
    }
  }
  return transferData as PreFileTransferReadyGetResponse
}

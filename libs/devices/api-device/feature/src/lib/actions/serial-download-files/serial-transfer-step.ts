/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  PreFileTransferReadyGetResponse,
} from "devices/api-device/models"
import { getFileTransfer } from "../../api/get-file-transfer"

interface TransferStepParams {
  device: ApiDevice
  transferData: PreFileTransferReadyGetResponse
  onProgress: (progress: number) => void
  abortController: AbortController
}

export const serialTransferStep = async ({
  device,
  transferData,
  onProgress,
  abortController,
}: TransferStepParams) => {
  onProgress(0)

  const chunks: string[] = []
  const chunksCount = Math.ceil(transferData.fileSize / transferData.chunkSize)

  for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const chunkResponse = await getFileTransfer(device, {
      transferId: transferData.transferId,
      chunkNumber,
    })
    if (!chunkResponse.ok) {
      throw new Error(`Failed to download file chunk ${chunkNumber}`)
    }
    onProgress(Math.round((chunkNumber / chunksCount) * 100))
    chunks.push(chunkResponse.body.data)
  }
  onProgress(100)
  return chunks.join("")
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, RestoreResponse200 } from "devices/api-device/models"
import { restore } from "../../api/restore"
import { delayUntil } from "app-utils/common"

interface RestoreStepParams {
  device: ApiDevice
  restoreId: number
  onProgress: (progress: number) => void
}

export const restoreStep = async ({
  device,
  restoreId,
  onProgress,
}: RestoreStepParams) => {
  onProgress(0)
  let restoreResponse200: Omit<RestoreResponse200, "_status"> = {}

  const restoreResponse = await restore(device, { restoreId, init: true })
  if (!restoreResponse.ok) {
    throw new Error("Failed to start restore process")
  }
  if (restoreResponse.status === 200) {
    onProgress(100)
    restoreResponse200 = restoreResponse.body
  } else if (restoreResponse.status === 202) {
    let restoreResponseStatus: 200 | 202 = 202

    while (restoreResponseStatus === 202) {
      const loopedRestoreResponse = await delayUntil(
        restore(device, { restoreId }),
        250
      )
      if (!loopedRestoreResponse.ok) {
        throw new Error("Failed to get restore progress")
      }
      if (loopedRestoreResponse.body.progress !== undefined) {
        onProgress(loopedRestoreResponse.body.progress)
      }
      if (loopedRestoreResponse.status === 200) {
        restoreResponse200 = loopedRestoreResponse.body
      }
      restoreResponseStatus = loopedRestoreResponse.status
    }
  }
  onProgress(100)
  return restoreResponse200
}

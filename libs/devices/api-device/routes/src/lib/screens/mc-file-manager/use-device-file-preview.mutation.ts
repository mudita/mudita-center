/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation } from "@tanstack/react-query"
import { ApiDevice } from "devices/api-device/models"
import { transferFiles } from "devices/api-device/feature"
import { TransferFilesActionType } from "devices/common/models"
import { AppError, AppResultFactory } from "app-utils/models"
import { FilesManagerFilePreviewDownload } from "devices/common/ui"

type Payload = Parameters<FilesManagerFilePreviewDownload>[0]

const mutationFn = async (
  { file, abortController }: Payload,
  device?: ApiDevice
) => {
  if (!device) {
    return AppResultFactory.failed(new AppError("Device not found"))
  }

  const fileResponse = await transferFiles({
    device,
    action: TransferFilesActionType.Download,
    files: [
      {
        id: file.id,
        source: {
          type: "path",
          path: file.path,
        },
        target: { type: "memory" },
      },
    ],
    abortController,
  })

  if (!fileResponse.ok) {
    return AppResultFactory.failed(fileResponse.error)
  }

  if (!("files" in fileResponse.data)) {
    return AppResultFactory.failed(new AppError("Invalid file response"))
  }

  return AppResultFactory.success(fileResponse.data.files[0] as string)
}

export const useDeviceFilePreviewMutation = (device?: ApiDevice) => {
  return useMutation({
    mutationFn: (payload: Payload) => mutationFn(payload, device),
  })
}

useDeviceFilePreviewMutation.mutationFn = mutationFn

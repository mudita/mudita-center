/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { ApiDevice, ApiDeviceErrorType } from "devices/api-device/models"
import { AppInstallationErrorName } from "devices/common/models"
import { ErrorResponse } from "devices/api-device/adapters"
import { delay } from "app-utils/common"
import { postAppInstall } from "../../api/post-app-install"
import { getAppInstall } from "../../api/get-app-install"

interface ProcessItem {
  filePath: string
}

export interface ProcessProgressItem extends ProcessItem {
  progress: number
}

interface ProcessProgress {
  progress: number
  total: number
  item?: ProcessProgressItem
}

interface InstallAppParams {
  device: ApiDevice
  files: ProcessItem[]
  onProgress?: (progress: ProcessProgress) => void
}

export interface FailedProcessItem extends ProcessItem {
  errorName: AppInstallationErrorName | string
}

const getAppInstallationErrorName = (
  error: ErrorResponse<"APP_INSTALL">
): AppInstallationErrorName | string => {
  return error.status === ApiDeviceErrorType.Unauthorized
    ? AppInstallationErrorName.ErrorVersion
    : "unknown"
}

export const installApp = async ({
  device,
  files,
  onProgress,
}: InstallAppParams): Promise<
  AppResult<
    { failed?: FailedProcessItem[] },
    AppInstallationErrorName | string,
    { failed: FailedProcessItem[] }
  >
> => {
  const failed: FailedProcessItem[] = []

  const total = 100 * files.length

  onProgress?.({
    progress: 0,
    total,
  })

  for (const file of files) {
    const postAppInstallResult = await postAppInstall(device, {
      filePath: file.filePath,
    })
    if (!postAppInstallResult.ok) {
      const errorName = getAppInstallationErrorName(postAppInstallResult)
      failed.push({
        ...file,
        errorName,
      })
      continue
    }

    const installationId = postAppInstallResult.body.installationId

    const checkAppInstallProgress = async (): Promise<undefined | AppError> => {
      const getAppInstallProgressResult = await getAppInstall(device, {
        installationId,
      })

      if (!getAppInstallProgressResult.ok) {
        const errorName = getAppInstallationErrorName(
          getAppInstallProgressResult
        )
        return new AppError("", errorName)
      }

      const fileProgress = Math.min(
        Math.max(getAppInstallProgressResult.body.progress, 0),
        100
      )
      const progress = files.indexOf(file) * 100 + fileProgress

      onProgress?.({
        progress,
        total,
        item: {
          ...file,
          progress: fileProgress,
        },
      })

      await delay(250)

      if (fileProgress < 100) {
        return checkAppInstallProgress()
      }

      return undefined
    }

    const checkAppInstallProgressResult = await checkAppInstallProgress()

    if (checkAppInstallProgressResult instanceof AppError) {
      failed.push({
        ...file,
        errorName: checkAppInstallProgressResult.name,
      })
    }
  }

  onProgress?.({
    progress: 100,
    total,
  })

  return failed.length === files.length
    ? AppResultFactory.failed(new AppError("", failed[0].errorName), { failed })
    : AppResultFactory.success({ failed })
}

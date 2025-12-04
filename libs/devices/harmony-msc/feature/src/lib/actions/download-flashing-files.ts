/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppHttp } from "app-utils/renderer"
import { MscFlashFile } from "devices/harmony-msc/models"
import {
  AppFileSystemGuardOptions,
  AppResult,
  AppResultFactory,
} from "app-utils/models"

export const getMscHarmonyFlashingFilesDownloadLocation = (
  fileName: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: ["msc-harmony", fileName],
    scope: "userData",
  }
}

export const downloadFlashingFiles = async (
  files: MscFlashFile[],
  signal?: AbortSignal
): Promise<AppResult> => {
  for (const file of files) {
    const downloadResult = await AppHttp.request({
      signal,
      url: file.url,
      method: "GET",
      responseType: "arraybuffer",
      savePath: getMscHarmonyFlashingFilesDownloadLocation(file.name)
        .scopeRelativePath,
    })
    if (!downloadResult.ok) {
      return AppResultFactory.failed(downloadResult.error)
    }
  }

  return AppResultFactory.success()
}

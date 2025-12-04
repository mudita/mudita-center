/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppError,
  AppResult,
  AppResultFactory,
  OsEnvironment,
  platform,
} from "app-utils/models"
import {
  HarmonyMscFlashingProgress,
  HarmonyMscProcessState,
} from "devices/harmony-msc/models"
import {
  getMscFlashDetails,
  GetMscFlashDetailsParams,
} from "../../api/get-msc-flash-details"
import { downloadFlashingFiles } from "../download-flashing-files"
import { flashHarmonyMscRunStep } from "./flash-harmony-msc-run-step"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"

export const flashHarmonyMsc = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  if (platform === "unknown") {
    return AppResultFactory.failed(new AppError("Unsupported platform"))
  }

  const getMscFlashDetailsParams: GetMscFlashDetailsParams = {
    platform,
    product: "MscHarmony",
    environment: OsEnvironment.Production,
  }

  const getMscFlashDetailsResult = await flashHarmonyMscRunStep({
    state: HarmonyMscProcessState.GettingFilesDetails,
    progress: HarmonyMscFlashingProgress.GettingFilesDetails,
    task: () => getMscFlashDetails(getMscFlashDetailsParams, params.signal),
    ...params,
  })

  if (!getMscFlashDetailsResult.ok) {
    return getMscFlashDetailsResult
  }

  const mscFlashDetails = getMscFlashDetailsResult.data

  const filesToDownload = [mscFlashDetails.image, ...mscFlashDetails.scripts]

  const downloadFlashingFilesResult = await flashHarmonyMscRunStep({
    state: HarmonyMscProcessState.DownloadingFiles,
    progress: HarmonyMscFlashingProgress.DownloadingFiles,
    task: () => downloadFlashingFiles(filesToDownload, params.signal),
    ...params,
  })

  if (!downloadFlashingFilesResult.ok) {
    return downloadFlashingFilesResult
  }

  return AppResultFactory.failed(new AppError("Not implemented"))
}

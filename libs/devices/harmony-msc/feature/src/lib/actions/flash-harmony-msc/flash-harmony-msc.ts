/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppResult, getMscHarmonyLocation,
  OsEnvironment,
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
import { unpackFlashingImage } from "../unpack-flashing-image"
import { postFlash } from "../../api/post-flash"
import { flashHarmonyMscRunStep } from "./flash-harmony-msc-run-step"
import { flashHarmonyMscParams } from "./flash-harmony-msc.types"
import { flashHarmonyCompletionFlow } from "./flash-harmony-completion-flow"
import { AppFileSystem } from "app-utils/renderer"

export const flashHarmonyMsc = async (
  params: flashHarmonyMscParams
): Promise<AppResult> => {
  await AppFileSystem.rm({
    ...getMscHarmonyLocation(),
    options: { recursive: true, force: true },
  })

  const getMscFlashDetailsParams: GetMscFlashDetailsParams = {
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

  const unpackFlashingImageResult = await flashHarmonyMscRunStep({
    state: HarmonyMscProcessState.UnpackingFiles,
    progress: HarmonyMscFlashingProgress.UnpackingFiles,
    task: () => unpackFlashingImage(mscFlashDetails, params.signal),
    ...params,
  })

  if (!unpackFlashingImageResult.ok) {
    return unpackFlashingImageResult
  }

  const flashDeviceResult = await flashHarmonyMscRunStep({
    state: HarmonyMscProcessState.FlashingProcess,
    progress: HarmonyMscFlashingProgress.FlashingProcess,
    task: () => postFlash(params.device, unpackFlashingImageResult.data),
    ...params,
  })

  if (!flashDeviceResult.ok) {
    return flashDeviceResult
  }

  return flashHarmonyCompletionFlow(params)
}

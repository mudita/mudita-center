/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FlashingProcessState, SupportedPlatform, Product } from "../constants"
import { setFlashingProcessState } from "../actions/set-flashing-process-state.action"
import { getMscFlashingFilesDetails } from "../actions/get-msc-flashing-files-details.action"
import { MscFlashDetails } from "../dto"
import { downloadFlashingFileRequest } from "../requests"
import { unpackFlashingImageService } from "./unpack-flashing-image"
import DeviceFlashFactory from "./device-flash/device-flash.factory"
import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"

const IMAGE_FILE_NAME = "BellHybrid.img"
import { RELEASE_SPACE } from "Core/update/constants/release-space.constant"
import MacDeviceFlashService from "./device-flash/macos/macos-device-flash-service"
import { removeDownloadedMscFiles } from "./remove-downloaded-msc-files.service"
import { setMscFlashingAbort } from "../actions/actions"
import { selectIsFlashingInActivePhases } from "../selectors"
import logger from "Core/__deprecated__/main/utils/logger"

export const flashMscDeviceService =
  () => async (dispatch: Dispatch, getState: () => ReduxRootState) => {
    try {
      const abortController = new AbortController()
      dispatch(setMscFlashingAbort(abortController))

      await getFlashingImageDetails(dispatch, abortController.signal)

      const mscFlashingFiles = getState().flashing.mscFlashDetails

      if (mscFlashingFiles) {
        await downloadFlashingFiles(
          dispatch,
          mscFlashingFiles,
          abortController.signal
        )
        await unpackFlashingImage(
          dispatch,
          mscFlashingFiles,
          abortController.signal
        )
        await startFlashingProcess(
          dispatch,
          mscFlashingFiles,
          abortController.signal
        )
      }
    } catch (error) {
      await removeDownloadedMscFiles()

      const flashingInActivePhases = selectIsFlashingInActivePhases(getState())
      if (flashingInActivePhases) {
        logger.error("Error during flashing process:", error)
        dispatch(setFlashingProcessState(FlashingProcessState.Failed))
      }
    }
  }

const getFlashingImageDetails = async (
  dispatch: Dispatch,
  signal: AbortSignal
) => {
  if (signal.aborted) {
    return
  }
  dispatch(setFlashingProcessState(FlashingProcessState.GettingFilesDetails))

  let platform: SupportedPlatform

  if (process.platform === "darwin") {
    platform = SupportedPlatform.MacOs
  } else if (process.platform === "linux") {
    platform = SupportedPlatform.Linux
  } else if (process.platform === "win32") {
    platform = SupportedPlatform.Windows
  } else {
    throw new Error(`Unsupported platform: ${process.platform}`)
  }

  await dispatch(
    getMscFlashingFilesDetails({
      signal,
      platform,
      product: Product.MscHarmony,
      environment: RELEASE_SPACE,
    })
  )
}

const downloadFlashingFiles = async (
  dispatch: Dispatch,
  mscFlashingFiles: MscFlashDetails,
  signal: AbortSignal
) => {
  if (signal.aborted) {
    return
  }
  dispatch(setFlashingProcessState(FlashingProcessState.DownloadingFiles))

  for (const file of [mscFlashingFiles.image, ...mscFlashingFiles.scripts]) {
    const downloadResult = await downloadFlashingFileRequest(
      {
        url: file.url,
        fileName: file.name,
      },
      signal
    )
    if (!downloadResult.ok) {
      throw new Error(`Failed to download file: ${file.name}`)
    }
  }
}

const unpackFlashingImage = async (
  dispatch: Dispatch,
  mscFlashingFiles: MscFlashDetails | undefined,
  signal: AbortSignal
) => {
  if (signal.aborted) {
    return
  }
  dispatch(setFlashingProcessState(FlashingProcessState.UnpackingFiles))

  const flashingImageName = mscFlashingFiles ? mscFlashingFiles.image.name : ""

  await unpackFlashingImageService(flashingImageName)
}

const startFlashingProcess = async (
  dispatch: Dispatch,
  flashingFiles: MscFlashDetails | undefined,
  signal: AbortSignal
) => {
  try {
    if (signal.aborted) {
      return
    }

    dispatch(setFlashingProcessState(FlashingProcessState.FlashingProcess))
    const { osDownloadLocation } = await getAppSettingsMain()
    if (signal.aborted) {
      return
    }

    const deviceFlash =
      DeviceFlashFactory.createDeviceFlashService(osDownloadLocation)
    const deviceName =
      process.platform === "win32" ? "MUDITA HARMONY MSC" : "HARMONY"
    const device = await deviceFlash.findDeviceByDeviceName(deviceName)

    const flashingFilesScripts =
      process.platform === "win32"
        ? flashingFiles?.scripts[1]
        : flashingFiles?.scripts[0]
    const flashingScriptName = flashingFilesScripts?.name ?? ""

    const imageFilePath = path.join(osDownloadLocation, IMAGE_FILE_NAME)
    const scriptFilePath = path.join(osDownloadLocation, flashingScriptName)

    await deviceFlash.execute(device, imageFilePath, scriptFilePath)
    if (signal.aborted) {
      return
    }

    if (deviceFlash instanceof MacDeviceFlashService) {
      dispatch(setFlashingProcessState(FlashingProcessState.TerminalOpened))

      await deviceFlash.waitForFlashCompletion({ signal })
    }

    if (signal.aborted) {
      return
    }

    if (process.platform === "win32") {
      dispatch(
        setFlashingProcessState(FlashingProcessState.WaitingForBackButton)
      )
    } else {
      dispatch(setFlashingProcessState(FlashingProcessState.Restarting))
    }

    await removeDownloadedMscFiles()
  } catch (error) {
    throw new Error(`Flash process failed with error: ${JSON.stringify(error)}`)
  }
}

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
import { removeDownloadedMscFiles } from "./remove-downloaded-msc-files.service"

export const flashMscDeviceService =
  () => async (dispatch: Dispatch, getState: () => ReduxRootState) => {
    try {
      await getFlashingImageDetails(dispatch)

      const mscFlashingFiles = getState().flashing.mscFlashDetails

      if (mscFlashingFiles) {
        await downloadFlashingFiles(dispatch, mscFlashingFiles)
        await unpackFlashingImage(dispatch, mscFlashingFiles)
        await startFlashingProcess(dispatch, mscFlashingFiles)
        await removeDownloadedMscFiles()
      }
    } catch (error) {
      console.error("Error during flashing process:", error)
      dispatch(setFlashingProcessState(FlashingProcessState.Failed))
      await removeDownloadedMscFiles()
    }
  }

const getFlashingImageDetails = async (dispatch: Dispatch) => {
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
      product: Product.MscHarmony,
      environment: RELEASE_SPACE,
      platform: platform,
    })
  )
}

const downloadFlashingFiles = async (
  dispatch: Dispatch,
  mscFlashingFiles: MscFlashDetails
) => {
  dispatch(setFlashingProcessState(FlashingProcessState.DownloadingFiles))

  for (const file of [mscFlashingFiles.image, ...mscFlashingFiles.scripts]) {
    const downloadResult = await downloadFlashingFileRequest({
      url: file.url,
      fileName: file.name,
    })
    if (!downloadResult.ok) {
      throw new Error(`Failed to download file: ${file.name}`)
    }
  }
}

const unpackFlashingImage = async (
  dispatch: Dispatch,
  mscFlashingFiles: MscFlashDetails | undefined
) => {
  dispatch(setFlashingProcessState(FlashingProcessState.UnpackingFiles))

  const flashingImageName = mscFlashingFiles ? mscFlashingFiles.image.name : ""

  await unpackFlashingImageService(flashingImageName)
}

const startFlashingProcess = async (
  dispatch: Dispatch,
  flashingFiles: MscFlashDetails | undefined
) => {
  try {
    dispatch(setFlashingProcessState(FlashingProcessState.FlashingProcess))

    const deviceFlash = DeviceFlashFactory.createDeviceFlashService()

    const device = await deviceFlash.findDeviceByDeviceName("HARMONY")

    const { osDownloadLocation } = await getAppSettingsMain()
    const flashingScriptName = flashingFiles
      ? flashingFiles.scripts[0].name
      : ""

    const imageFilePath = path.join(osDownloadLocation, IMAGE_FILE_NAME)
    const scriptFilePath = path.join(osDownloadLocation, flashingScriptName)

    await deviceFlash.execute(device, imageFilePath, scriptFilePath)

    dispatch(setFlashingProcessState(FlashingProcessState.Restarting))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Flash process failed with error: ${error}`)
  }
}

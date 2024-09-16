/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import path from "path"
import {
  FlashingProcessState,
  OsEnvironment,
  Platform,
  Product,
} from "../constants"
import { setFlashingProcessState } from "../actions/set-flashing-process-state/set-flashing-process-state.action"
import { getMscFlashingFilesDetails } from "../actions/get-msc-flashing-files-details/get-msc-flashing-files-details.action"
import { MscFlashDetails } from "../dto"
import { downloadFlashingFileRequest } from "../requests"
import { unpackFlashingImageService } from "./unpack-flashing-image"
import DeviceFlashFactory from "./device-flash/device-flash.factory"
import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"

const IMAGE_FILE_NAME = "BellHybrid.img"

export const flashMscDeviceService =
  () => async (dispatch: Dispatch, getState: () => ReduxRootState) => {
    try {
      await getFlashingImageDetails(dispatch)

      const flashingFiles = getState().flashing.mscFlashingFilesDetails

      if (flashingFiles) {
        await downloadFlashingFiles(dispatch, flashingFiles)
        await unpackFlashingImage(dispatch, flashingFiles)
        await startFlashingProcess(dispatch, flashingFiles)
      }
    } catch (error) {
      console.error("Error during flashing process:", error)
      dispatch(setFlashingProcessState(FlashingProcessState.Failed))
    }
  }

const getFlashingImageDetails = async (dispatch: Dispatch) => {
  dispatch(
    setFlashingProcessState(FlashingProcessState.GettingFlashingFilesDetails)
  )

  let platform: Platform

  if (process.platform === "darwin") {
    platform = Platform.MacOs
  } else if (process.platform === "linux") {
    platform = Platform.Linux
  } else if (process.platform === "win32") {
    platform = Platform.Windows
  } else {
    throw new Error(`Unsupported platform: ${process.platform}`)
  }

  await dispatch(
    getMscFlashingFilesDetails({
      product: Product.MscHarmony,
      environment: OsEnvironment.Daily,
      platform: platform,
    })
  )
}

const downloadFlashingFiles = async (
  dispatch: Dispatch,
  flashingFiles: MscFlashDetails
) => {
  dispatch(
    setFlashingProcessState(FlashingProcessState.DownloadingFlashingFiles)
  )

  for (const file of [flashingFiles.image, ...flashingFiles.scripts]) {
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
  flashingFiles: MscFlashDetails | undefined
) => {
  dispatch(setFlashingProcessState(FlashingProcessState.UnpackingFlashingFiles))

  const flashingImageName = flashingFiles ? flashingFiles.image.name : ""

  await unpackFlashingImageService(flashingImageName)
}

const startFlashingProcess = async (
  dispatch: Dispatch,
  flashingFiles: MscFlashDetails | undefined
) => {
  try {
    dispatch(setFlashingProcessState(FlashingProcessState.FlashingProcess))

    const deviceFlash = DeviceFlashFactory.createDeviceFlashService()

    const device = await deviceFlash.findDeviceByDeviceName("HARMONY MSC")

    const { osDownloadLocation } = await getAppSettingsMain()
    const flashingScriptName = flashingFiles
      ? flashingFiles.scripts[0].name
      : ""

    const imageFilePath = path.join(osDownloadLocation, IMAGE_FILE_NAME)
    const scriptFilePath = path.join(osDownloadLocation, flashingScriptName)

    await deviceFlash.execute(device, imageFilePath, scriptFilePath)

    dispatch(setFlashingProcessState(FlashingProcessState.Completed))
  } catch (error) {
    console.error("Flash process failed with error: ", error)
    dispatch(setFlashingProcessState(FlashingProcessState.Failed))
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
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

export const flashMscDeviceService =
  () => async (dispatch: Dispatch, getState: () => ReduxRootState) => {
    try {
      await getFlashingImageDetails(dispatch)

      const flashingFiles = getState().flashing.mscFlashingFilesDetails

      if (flashingFiles) {
        await downloadFlashingFiles(dispatch, flashingFiles)
        await unpackFlashingImage(dispatch, flashingFiles)
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
  await dispatch(
    getMscFlashingFilesDetails({
      product: Product.MscHarmony,
      environment: OsEnvironment.Daily,
      platform: Platform.MacOs,
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
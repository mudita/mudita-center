/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  FilesManagerEvent,
  EligibleFormat,
  DeviceDirectory,
} from "App/files-manager/constants"
import { getPathRequest } from "App/file-system/requests"
import { uploadFilesRequest } from "App/files-manager/requests"
import { UploadFileInput } from "App/files-manager/dto"
import { getFiles } from "App/files-manager/actions/get-files.action"

export const uploadFiles = createAsyncThunk(
  FilesManagerEvent.UploadFiles,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    const filesToUpload = await getPathRequest({
      filters: [
        {
          name: "Audio",
          extensions: [
            EligibleFormat.FLAC,
            EligibleFormat.MP3,
            EligibleFormat.WAV,
          ],
        },
      ],
      properties: ["openFile", "multiSelections"],
    })

    if (!filesToUpload.ok || !filesToUpload.data) {
      return rejectWithValue(filesToUpload.error)
    }

    const uploadFilesInput: UploadFileInput = {
      directory: DeviceDirectory.Music,
      paths: filesToUpload.data,
    }

    if (state.device.deviceType === DeviceType.MuditaHarmony) {
      uploadFilesInput.directory = DeviceDirectory.Relaxation
    }

    const result = await uploadFilesRequest(uploadFilesInput)

    console.log(result)

    await dispatch(getFiles(uploadFilesInput.directory))

    return
  }
)

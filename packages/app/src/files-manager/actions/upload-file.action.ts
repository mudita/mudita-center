/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants/state.constant"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  FilesManagerEvent,
  EligibleFormat,
  DeviceDirectory,
} from "App/files-manager/constants"
import { getPathsRequest } from "App/file-system/requests"
import { uploadFilesRequest } from "App/files-manager/requests"
import { getFiles } from "App/files-manager/actions/get-files.action"
import {
  setUploadBlocked,
  setUploadingFileLength,
  setUploadingState,
} from "App/files-manager/actions/base.action"
import { loadStorageInfoAction } from "App/device/actions/load-storage-info.action"

export const uploadFile = createAsyncThunk(
  FilesManagerEvent.UploadFiles,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === null) {
      return rejectWithValue("device Type isn't set")
    }
    dispatch(setUploadBlocked(true))
    const filesToUpload = await getPathsRequest({
      filters: [
        {
          name: "Audio",
          extensions: Object.values(EligibleFormat),
        },
      ],
      properties: ["openFile", "multiSelections"],
    })

    if (!filesToUpload.ok || !filesToUpload.data) {
      return rejectWithValue(filesToUpload.error)
    }

    const filePaths = filesToUpload.data

    if (filePaths?.length === 0) {
      dispatch(setUploadBlocked(false))
      return
    }

    dispatch(setUploadingFileLength(filePaths.length))
    dispatch(setUploadingState(State.Loading))
    dispatch(setUploadBlocked(false))

    const directory =
      state.device.deviceType === DeviceType.MuditaHarmony
        ? DeviceDirectory.Relaxation
        : DeviceDirectory.Music

    const result = await uploadFilesRequest({
      directory,
      filePaths,
    })

    if (!result.ok) {
      return rejectWithValue(result.error)
    }

    await dispatch(getFiles(directory))
    await dispatch(loadStorageInfoAction())
    dispatch(setUploadingState(State.Loaded))

    return
  }
)

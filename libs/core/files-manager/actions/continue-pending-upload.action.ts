/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "Core/core/constants/state.constant"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  FilesManagerEvent,
  DeviceDirectory,
} from "Core/files-manager/constants"
import { uploadFilesRequest } from "Core/files-manager/requests"
import { getFiles } from "Core/files-manager/actions/get-files.action"
import {
  setPendingFilesToUpload,
  setUploadBlocked,
  setUploadingFileCount,
  setUploadingState,
} from "Core/files-manager/actions/base.action"
import { loadStorageInfoAction } from "Core/device/actions/load-storage-info.action"
import { getHarmonyFreeFilesSlotsCount } from "Core/files-manager/helpers/get-free-files-slots-count-for-harmony.helper"

export const continuePendingUpload = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(
  FilesManagerEvent.ContinuePendingUpload,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.deviceType === null) {
      return rejectWithValue("device Type isn't set")
    }
    dispatch(setUploadBlocked(true))

    const filePaths = state.filesManager.uploadPendingFiles

    if (filePaths.length === 0) {
      dispatch(setUploadBlocked(false))
      return
    }

    const harmonyFreeFilesSlotsCount = getHarmonyFreeFilesSlotsCount(
      state.filesManager.files?.length ?? 0
    )

    if (
      state.device.deviceType === DeviceType.MuditaHarmony &&
      harmonyFreeFilesSlotsCount === 0
    ) {
      dispatch(setUploadBlocked(false))
      return
    }

    if (
      state.device.deviceType === DeviceType.MuditaHarmony &&
      harmonyFreeFilesSlotsCount < filePaths.length
    ) {
      dispatch(
        setPendingFilesToUpload(filePaths.slice(0, harmonyFreeFilesSlotsCount))
      )
      dispatch(setUploadingState(State.Pending))
      dispatch(setUploadBlocked(false))
      return
    }
    dispatch(setUploadingFileCount(filePaths.length))
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
    void dispatch(getFiles(directory))

    if (!result.ok) {
      return rejectWithValue(result.error)
    }

    void dispatch(loadStorageInfoAction())
    dispatch(setUploadingState(State.Loaded))

    return
  }
)

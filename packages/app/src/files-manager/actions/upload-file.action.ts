/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants/state.constant"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  FilesManagerEvent,
  EligibleFormat,
  DeviceDirectory,
  FilesManagerError,
} from "App/files-manager/constants"
import { getPathsRequest } from "App/file-system/requests"
import { uploadFilesRequest } from "App/files-manager/requests"
import { getFiles } from "App/files-manager/actions/get-files.action"
import {
  setDuplicatedFiles,
  setPendingFilesToUpload,
  setUploadBlocked,
  setUploadingFileCount,
  setUploadingState,
} from "App/files-manager/actions/base.action"
import { loadStorageInfoAction } from "App/device/actions/load-storage-info.action"
import { getHarmonyFreeFilesSlotsCount } from "App/files-manager/helpers/get-free-files-slots-count-for-harmony.helper"
import { getDuplicatedFiles } from "App/files-manager/helpers/get-duplicated-files.helper"
import { getUniqueFiles } from "App/files-manager/helpers/get-unique-files.helper"
import { AppError } from "App/core/errors/app-error"
import { checkFilesExtensions } from "../helpers/check-files-extensions.helper"

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

    const filePaths = filesToUpload.data ?? []

    if (filePaths.length === 0) {
      dispatch(setUploadBlocked(false))
      return
    }

    const allFilesSupported = checkFilesExtensions(filePaths)

    if (!allFilesSupported) {
      dispatch(setUploadBlocked(false))
      return rejectWithValue(
        new AppError(
          FilesManagerError.UnsupportedFileFormat,
          "Unsupported file format"
        )
      )
    }

    const duplicatedFiles = getDuplicatedFiles(
      state.filesManager.files,
      filePaths
    )

    if (duplicatedFiles.length > 0) {
      const uniqueFiles = getUniqueFiles(state.filesManager.files, filePaths)
      dispatch(setPendingFilesToUpload(uniqueFiles))
      dispatch(setDuplicatedFiles(duplicatedFiles))
      dispatch(setUploadBlocked(false))
      return rejectWithValue(
        new AppError(
          FilesManagerError.UploadDuplicates,
          "File already exists on your device"
        )
      )
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

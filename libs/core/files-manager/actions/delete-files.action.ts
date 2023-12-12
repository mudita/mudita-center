/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "Core/files-manager/constants"
import { deleteFilesRequest } from "Core/files-manager/requests/delete-files.request"
import { loadStorageInfoAction } from "Core/device/actions/load-storage-info.action"

export const deleteFiles = createAsyncThunk<string[], string[]>(
  FilesManagerEvent.DeleteFiles,
  async (ids, { rejectWithValue, dispatch }) => {
    const result = await deleteFilesRequest(ids)

    if (!result.ok || !result.data) {
      return rejectWithValue(result.error)
    }

    void dispatch(loadStorageInfoAction())

    return result.data
  }
)

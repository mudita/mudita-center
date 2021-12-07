/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MusicEvent } from "Renderer/modules/music/event.enum"
import { downloadFileRequest } from "Renderer/modules/music/download-file.request"
import { ReduxRootState, RootState } from "Renderer/store"
import { DownloadFileError } from "Renderer/modules/music/download-file.error"

export const downloadFile = createAsyncThunk<void, string>(
  MusicEvent.DownloadFile,
  async (id, {getState, dispatch, rejectWithValue}) => {
    const state = getState() as RootState & ReduxRootState
    const path = state.settings.pureFilesLocation
    if(path !== undefined){
      const { status } = await downloadFileRequest({ id, path })

      if(status === 1 ){
        return
      } else {
        return rejectWithValue(
          new DownloadFileError("Downloading file fails")
        )
      }
    } else {
      return rejectWithValue(
        new DownloadFileError("Can't read pure files location")
      )
    }
  }
)

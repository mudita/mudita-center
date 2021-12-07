/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MusicEvent } from "Renderer/modules/music/event.enum"
import { mtpConnectRequest } from "Renderer/modules/music/mtp-connect.request"
import { setState } from "Renderer/modules/music/base.action"
import { MtpConnectError } from "Renderer/modules/music/mtp-connect.error"

export const mtpConnect = createAsyncThunk<void, void>(
  MusicEvent.MtpConnect,
  // async (_, { getState, dispatch, rejectWithValue }) => {
  async (_, {dispatch, rejectWithValue}) => {
    // const state = getState() as RootState & ReduxRootState
    const { status, data, error } = await mtpConnectRequest()
    if(status === 1 && data !== undefined){
      console.log("mtpConnectRequest response: ", data)
      dispatch(setState({ files: data }))
    } else {
      console.log("error: ", error)
      return rejectWithValue(
        new MtpConnectError("Pure OS Backup Pure Location is undefined")
      )
    }

    return
  }
)

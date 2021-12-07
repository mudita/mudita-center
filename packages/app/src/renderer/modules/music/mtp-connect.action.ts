/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MusicEvent } from "Renderer/modules/music/event.enum"
import { mtpConnectRequest } from "Renderer/modules/music/mtp-connect.request"

export const mtpConnect = createAsyncThunk<void, void>(
  MusicEvent.MtpConnect,
  // async (_, { getState, dispatch, rejectWithValue }) => {
  async () => {
    // const state = getState() as RootState & ReduxRootState
    await mtpConnectRequest()
    console.log("mtpConnect action: ", )

    return
  }
)

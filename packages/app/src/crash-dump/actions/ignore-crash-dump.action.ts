/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ignoreCrashDumpRequest } from "App/crash-dump/requests/ignore-crash-dump.request"
import { Event } from "App/crash-dump/constants"
import { resetCrashDump } from "App/crash-dump/actions/base.action"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const ignoreCrashDump = createAsyncThunk<void>(
  Event.IgnoreRashDump,
  async (_, { dispatch, getState }) => {
    const state = getState() as ReduxRootState

    if (!state.crashDump.data.files.length) {
      return
    }

    for await (const file of state.crashDump.data.files) {
      await ignoreCrashDumpRequest(file)
    }

    await dispatch(resetCrashDump())
  }
)

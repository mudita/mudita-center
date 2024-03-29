/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ignoreCrashDumpRequest } from "Core/crash-dump/requests/ignore-crash-dump.request"
import { Event } from "Core/crash-dump/constants"
import { resetCrashDump } from "Core/crash-dump/actions/base.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

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

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await dispatch(resetCrashDump())
  }
)

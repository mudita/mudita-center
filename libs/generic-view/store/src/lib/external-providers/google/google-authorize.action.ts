/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../../action-names"
import {
  GoogleAuthFailedResponse,
  GoogleAuthSuccessResponse,
  Scope,
} from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Core/__deprecated__/common/enums/google-auth-actions.enum"

export const googleAuthorize = createAsyncThunk<
  GoogleAuthSuccessResponse | undefined,
  Scope,
  { state: ReduxRootState }
>(
  ActionName.GoogleAuthorizeProcess,
  async (payload, { getState, dispatch, rejectWithValue, signal }) => {
    console.log("Authorizing in Google")
    console.log("test authorize", getState())

    const token = getState().externalProviders.google[payload]

    if (
      token &&
      token.access_token &&
      new Date().getTime() < token.expires_in!
    ) {
      return
    }

    let unregisterMainListener = noop

    let result:
      | { state: "success"; data: GoogleAuthSuccessResponse }
      | { state: "failed"; data: string }
      | undefined

    void ipcRenderer.callMain(GoogleAuthActions.OpenWindow, payload)

    const processResponse = (response: string) => {
      const responseData = JSON.parse(response)

      if (responseData.error) {
        result = {
          state: "failed",
          data: (responseData as GoogleAuthFailedResponse).error,
        }
      } else {
        result = {
          state: "success",
          data: {
            ...responseData,
            expires_in: new Date().getTime() + responseData.expires_in * 1000,
          },
        }
      }
      void ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
      unregisterMainListener()
    }

    ipcRenderer.answerMain(GoogleAuthActions.CloseWindow, () => {
      if (result === undefined) {
        result = {
          state: "failed",
          data: "window closed",
        }
      }
    })

    unregisterMainListener = ipcRenderer.answerMain(
      GoogleAuthActions.GotCredentials,
      processResponse
    )

    await new Promise<void>((resolve) =>
      setInterval(() => {
        result !== undefined && resolve()
      }, 100)
    )

    console.log(result)
    if (result?.state === "success") {
      return result.data
    }

    if (result?.state === "failed") {
      return rejectWithValue(result.data)
    }

    return rejectWithValue("unknown error")
  }
)

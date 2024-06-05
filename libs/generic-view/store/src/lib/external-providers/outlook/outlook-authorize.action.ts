/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../../action-names"
import {
  OutLookScope,
  OutlookAuthErrorResponse,
  OutlookAuthSuccessResponse,
} from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import { OutlookAuthActions } from "Core/__deprecated__/common/enums/outlook-auth-actions.enum"
import {
  getAuthorizationUrl,
  getOutlookEndpoint,
  isOutlookErrorResponse,
} from "./outlook.helpers"

export const outlookAuthorize = createAsyncThunk<
  OutlookAuthSuccessResponse | OutlookAuthErrorResponse | undefined,
  OutLookScope,
  { state: ReduxRootState }
>(
  ActionName.OutlookAuthorizeProcess,
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const token = getState().externalProviders.outlook[payload]

    if (token.accessToken) {
      return
    }

    let unregisterMainListener = noop

    let result:
      | { state: "success"; data: OutlookAuthSuccessResponse }
      | { state: "failed"; data: string }
      | undefined

    void ipcRenderer.callMain(OutlookAuthActions.OpenWindow, {
      authorizationUrl: getAuthorizationUrl(payload),
      scope: getOutlookEndpoint(payload),
    })

    const processResponse = (
      response: OutlookAuthSuccessResponse | OutlookAuthErrorResponse
    ) => {
      if (isOutlookErrorResponse(response)) {
        result = {
          state: "failed",
          data: (response as OutlookAuthErrorResponse).error,
        }
      } else {
        result = {
          state: "success",
          data: response as OutlookAuthSuccessResponse,
        }
      }
      void ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
      unregisterMainListener()
    }

    ipcRenderer.answerMain(OutlookAuthActions.CloseWindow, () => {
      if (result === undefined) {
        result = {
          state: "failed",
          data: "window closed",
        }
      }
    })

    unregisterMainListener = ipcRenderer.answerMain(
      OutlookAuthActions.GotCredentials,
      processResponse
    )

    let resultInterval: NodeJS.Timeout | null = null

    await new Promise<void>((resolve) => {
      resultInterval = setInterval(() => {
        result !== undefined && resolve()
      }, 100)
    })

    if (resultInterval !== null) {
      clearInterval(resultInterval)
    }

    if (result?.state === "success") {
      return result.data
    }

    if (result?.state === "failed") {
      return rejectWithValue(result.data)
    }

    return rejectWithValue("unknown error")
  }
)

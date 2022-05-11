/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  rejectedAction,
  pendingAction,
  fulfilledAction,
} from "App/renderer/store/helpers"
import { Event } from "App/crash-dump/constants"
import {
  CrashDumpState,
  SetCrashDumpAction,
  GetCrashDumpRejectedAction,
  DownloadCrashDumpRejectedAction,
  SetDownloadedCrashDumpAction,
} from "App/crash-dump/reducers/crash-dump.interface"

export const initialState: CrashDumpState = {
  data: {
    files: [],
    downloadedFiles: [],
  },
  status: {
    loading: false,
    loaded: false,
    downloading: false,
    downloaded: false,
    sending: false,
    sent: false,
  },
  error: null,
}

export const crashDumpReducer = createReducer<CrashDumpState>(
  initialState,
  (builder) => {
    builder
      .addCase(Event.SetCrashDump, (state, action: SetCrashDumpAction) => {
        return {
          ...state,
          data: {
            ...state.data,
            files: action.payload,
          },
        }
      })

      .addCase(pendingAction(Event.GetCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            loaded: false,
            loading: true,
          },
        }
      })
      .addCase(fulfilledAction(Event.GetCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            loaded: true,
            loading: false,
          },
        }
      })
      .addCase(
        rejectedAction(Event.GetCrashDump),
        (state, action: GetCrashDumpRejectedAction) => {
          return {
            ...state,
            status: {
              ...state.status,
              loaded: false,
              loading: false,
            },
            error: action.payload,
          }
        }
      )

      .addCase(pendingAction(Event.DownloadCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            downloaded: false,
            downloading: true,
          },
        }
      })
      .addCase(fulfilledAction(Event.DownloadCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            downloaded: true,
            downloading: false,
          },
        }
      })
      .addCase(
        rejectedAction(Event.DownloadCrashDump),
        (state, action: DownloadCrashDumpRejectedAction) => {
          return {
            ...state,
            status: {
              ...state.status,
              downloaded: false,
              downloading: false,
            },
            error: action.payload,
          }
        }
      )

      .addCase(
        Event.SetDownloadCrashDumpPath,
        (state, action: SetDownloadedCrashDumpAction) => {
          return {
            ...state,
            data: {
              ...state.data,
              downloadedFiles: action.payload,
            },
          }
        }
      )

      .addCase(pendingAction(Event.SendCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            sending: true,
            sent: false,
          },
        }
      })

      .addCase(fulfilledAction(Event.SendCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            sending: false,
            sent: true,
          },
        }
      })

      .addCase(rejectedAction(Event.SendCrashDump), (state) => {
        return {
          ...state,
          status: {
            ...state.status,
            sending: false,
            sent: false,
          },
        }
      })

      .addCase(Event.ResetCrashDump, (state) => {
        return {
          ...state,
          ...initialState,
        }
      })
  }
)

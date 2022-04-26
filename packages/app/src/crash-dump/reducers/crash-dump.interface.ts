/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import {
  GetCrashDumpError,
  DownloadCrashDumpError,
} from "App/crash-dump/errors"

export interface CrashDumpState {
  data: {
    files: string[]
    downloadedFiles: string[]
  }
  status: {
    loading: boolean
    loaded: boolean
    downloading: boolean
    downloaded: boolean
    sending: boolean
    sent: boolean
  }
  error: Error | string | null
}

export type SetCrashDumpAction = PayloadAction<string[], Event.SetCrashDump>
export type SetDownloadedCrashDumpAction = PayloadAction<
  string[],
  Event.SetDownloadCrashDumpPath
>
export type GetCrashDumpRejectedAction = PayloadAction<
  GetCrashDumpError,
  Event.GetCrashDump
>
export type DownloadCrashDumpRejectedAction = PayloadAction<
  DownloadCrashDumpError,
  Event.DownloadCrashDump
>

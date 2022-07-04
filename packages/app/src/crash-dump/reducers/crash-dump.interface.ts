/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { CrashDumpError, Event } from "App/crash-dump/constants"

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
  AppError<CrashDumpError.Getting>,
  Event.GetCrashDump
>
export type DownloadCrashDumpRejectedAction = PayloadAction<
  AppError<CrashDumpError.Downloading>,
  Event.DownloadCrashDump
>

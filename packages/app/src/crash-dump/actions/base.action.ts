/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"

export const setCrashDump = createAction<string[]>(Event.SetCrashDump)
export const setDownloadedCrashDump = createAction<string[]>(Event.SetDownloadCrashDumpPath)

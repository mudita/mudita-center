/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

 import { CrashDumpError } from "App/crash-dump/constants"

 export class DownloadCrashDumpError extends Error {
   public type = CrashDumpError.Downloading
 
   constructor(public message: string, public payload?: any) {
     super()
 
     if (Error.captureStackTrace) {
       Error.captureStackTrace(this, DownloadCrashDumpError)
     }
   }
 }
 
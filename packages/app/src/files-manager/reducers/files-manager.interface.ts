/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { GetFilesError } from "App/files-manager/errors"
import { FilesManagerEvent } from "App/files-manager/constants"
import { McUsbFile } from "@mudita/pure"

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface FilesManagerState {
  resultState: ResultState
  files: McUsbFile[]
  error: Error | string | null
}

export type GetFilesRejectAction = PayloadAction<
  GetFilesError,
  FilesManagerEvent.GetFiles
>

export type SetFilesAction = PayloadAction<
  McUsbFile[],
  FilesManagerEvent.SetFiles
>

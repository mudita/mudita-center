/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { GetFilesError } from "App/files-manager/errors"
import { FilesManagerEvent } from "App/files-manager/constants"

export interface MetadataDeviceFile {
  id: string
  size: number
  name: string
  type: string
}

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface FilesManagerState {
  resultState: ResultState
  files: MetadataDeviceFile[]
  error: Error | string | null
}

export type GetFilesRejectAction = PayloadAction<
  GetFilesError,
  FilesManagerEvent.GetFiles
>

export type SetFilesAction = PayloadAction<
  MetadataDeviceFile[],
  FilesManagerEvent.SetFiles
>

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { GetFilesError } from "App/files-manager/errors"
import { FilesManagerEvent } from "App/files-manager/constants"

export interface MtpFile {
  id: string
  size: number
  name: string
  type: MtpFileType
}

export enum MtpFileType {
  wav = 0x3008,
  mp3 = 0x3009,
  flac = 0xb906,
}

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface FilesManagerState {
  resultState: ResultState
  files: MtpFile[]
  error: Error | string | null
}

export type GetFilesRejectAction = PayloadAction<
  GetFilesError,
  FilesManagerEvent.GetFiles
>

export type SetFilesAction = PayloadAction<
  MtpFile[],
  FilesManagerEvent.SetFiles
>

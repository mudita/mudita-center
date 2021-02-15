/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Response, ResponseStatus } from "../device/device.types"

// Enum starts from 1000 temporary until it will be documented in Pure API
export enum DeviceUpdateErrorResponseCode {
  NoError = 1000,
  CantCreateTempDir,
  CantCreateUpdatesDir,
  CantRemoveUniqueTmpDir,
  CantRemoveUpdateFile,
  CantCreateUniqueTmpDir,
  CantCreateExtractedFile,
  CantOpenChecksumsFile,
  VerifyChecksumsFailure,
  VerifyVersionFailure,
  CantWriteBootloader,
  CantOpenUpdateFile,
  CantDeletePreviousOS,
  CantRenameCurrentToPrevious,
  CantRenameTempToCurrent,
  CantUpdateJSON,
  CantSaveJSON,
  CantUpdateCRC32JSON,
  CantDeltreePreviousOS,
  CantWriteToFile,
  NoBootloaderFile,
  CantOpenBootloaderFile,
  CantAllocateBuffer,
  CantLoadBootloaderFile
}


export interface DeviceUpdateErrorResponse extends Response {
  status: ResponseStatus.InternalServerError
  error: {
    code: DeviceUpdateErrorResponseCode
    message: string
  }
}

export interface DeviceUpdateResponse extends Response {
  status: ResponseStatus.Ok
}

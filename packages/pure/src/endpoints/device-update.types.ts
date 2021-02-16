/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Response, ResponseStatus } from "../device/device.types"

export enum DeviceUpdateError {
  NoError = "NoError",
  CantCreateTempDir = "CantCreateTempDir",
  CantCreateUpdatesDir = "CantCreateUpdatesDir",
  CantRemoveUniqueTmpDir = "CantRemoveUniqueTmpDir",
  CantRemoveUpdateFile = "CantRemoveUpdateFile",
  CantCreateUniqueTmpDir = "CantCreateUniqueTmpDir",
  CantCreateExtractedFile = "CantCreateExtractedFile",
  CantOpenChecksumsFile = "CantOpenChecksumsFile",
  VerifyChecksumsFailure = "VerifyChecksumsFailure",
  VerifyVersionFailure = "VerifyVersionFailure",
  CantWriteBootloader = "CantWriteBootloader",
  CantOpenUpdateFile = "CantOpenUpdateFile",
  CantDeletePreviousOS = "CantDeletePreviousOS",
  CantRenameCurrentToPrevious = "CantRenameCurrentToPrevious",
  CantRenameTempToCurrent = "CantRenameTempToCurrent",
  CantUpdateJSON = "CantUpdateJSON",
  CantSaveJSON = "CantSaveJSON",
  CantUpdateCRC32JSON = "CantUpdateCRC32JSON",
  CantDeltreePreviousOS = "CantDeltreePreviousOS",
  CantWriteToFile = "CantWriteToFile",
  NoBootloaderFile = "NoBootloaderFile",
  CantOpenBootloaderFile = "CantOpenBootloaderFile",
  CantAllocateBuffer = "CantAllocateBuffer",
  CantLoadBootloaderFile = "CantLoadBootloaderFile ",
}

// Object Map starts from 1000 temporary until it will be documented in Pure API
export const deviceUpdateErrorCodeMap: Record<DeviceUpdateError, number> = {
  [DeviceUpdateError.NoError]: 1000,
  [DeviceUpdateError.CantCreateTempDir]: 1001,
  [DeviceUpdateError.CantCreateUpdatesDir]: 1002,
  [DeviceUpdateError.CantRemoveUniqueTmpDir]: 1003,
  [DeviceUpdateError.CantRemoveUpdateFile]: 1004,
  [DeviceUpdateError.CantCreateUniqueTmpDir]: 1005,
  [DeviceUpdateError.CantCreateExtractedFile]: 1006,
  [DeviceUpdateError.CantOpenChecksumsFile]: 1007,
  [DeviceUpdateError.VerifyChecksumsFailure]: 1008,
  [DeviceUpdateError.VerifyVersionFailure]: 1009,
  [DeviceUpdateError.CantWriteBootloader]: 1010,
  [DeviceUpdateError.CantOpenUpdateFile]: 1011,
  [DeviceUpdateError.CantDeletePreviousOS]: 1012,
  [DeviceUpdateError.CantRenameCurrentToPrevious]: 1013,
  [DeviceUpdateError.CantRenameTempToCurrent]: 1014,
  [DeviceUpdateError.CantUpdateJSON]: 1015,
  [DeviceUpdateError.CantSaveJSON]: 1016,
  [DeviceUpdateError.CantUpdateCRC32JSON]: 1017,
  [DeviceUpdateError.CantDeltreePreviousOS]: 1018,
  [DeviceUpdateError.CantWriteToFile]: 1019,
  [DeviceUpdateError.NoBootloaderFile]: 1020,
  [DeviceUpdateError.CantOpenBootloaderFile]: 1021,
  [DeviceUpdateError.CantAllocateBuffer]: 1022,
  [DeviceUpdateError.CantLoadBootloaderFile]: 1023,
}

export interface DeviceUpdateErrorResponse extends Response {
  status: ResponseStatus.InternalServerError
  error: {
    code: number
    message: string
  }
}

export interface DeviceUpdateResponse extends Response {
  status: ResponseStatus.Ok
}

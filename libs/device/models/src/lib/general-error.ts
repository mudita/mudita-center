/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum GeneralError {
  NoDevice = "no-device",
  IncorrectResponse = "incorrect-response",
  InternalError = "internal-error",
  UserCancelled = "user-cancelled",
}

export enum ApiError {
  DeviceLocked = 423,
}

export enum ApiFileTransferError {
  AccessRestricted = 403,
  IncorrectPath = 404,
  FileAlreadyExists = 409,
  Aborted = 418,
  CRCMismatch = 422,
  Unknown = 500,
  NotEnoughSpace = 507,
  MtpInitializeAccessError = 511,
}

export enum EntitiesError {
  EntityTypeNotSupported = 406,
  EntitiesDataFileCorrupted = 422,
}

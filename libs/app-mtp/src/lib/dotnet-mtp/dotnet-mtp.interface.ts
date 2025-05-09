/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DotnetCliCommandAction {
  GET_DEVICES = "GET_DEVICES",
  GET_DEVICE_STORAGES = "GET_DEVICE_STORAGES",
  UPLOAD_FILE = "UPLOAD_FILE",
  GET_UPLOAD_FILE_PROGRESS = "GET_UPLOAD_FILE_PROGRESS",
}

export enum DotnetCliStatusCode {
  None = 0,
  Success = 200,
  InProgress = 202,
  UnknownDevice = 404,
  BadRequest = 405,
  GeneralError = 500,
  NotEnoughSpace = 507,
}

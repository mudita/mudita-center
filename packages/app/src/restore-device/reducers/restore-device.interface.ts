/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import {
  RestoreDeviceError,
  RestoreDeviceEvent,
} from "App/restore-device/constants"

export enum RestoreDeviceDataState {
  Running,
  Finished,
  Empty,
  Error,
}

export interface RestoreDeviceState {
  state: RestoreDeviceDataState
  error: Error | string | null
}

export type StartRestoreDeviceErrorRejectAction = PayloadAction<
  AppError<RestoreDeviceError.StartRestoreDevice>,
  RestoreDeviceEvent.StartRestoreDevice
>

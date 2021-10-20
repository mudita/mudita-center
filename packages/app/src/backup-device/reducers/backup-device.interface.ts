/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { BackupDeviceEvent } from "App/backup-device/constants"

export enum BackupDeviceDataState {
  Running,
  Finished,
  Empty,
  Error,
}

export interface BackupDeviceState {
  state: BackupDeviceDataState
  error: Error | string | null
}

export type StartBackupDeviceErrorRejectAction = PayloadAction<
  StartBackupDeviceError,
  BackupDeviceEvent.StartBackupDevice
>

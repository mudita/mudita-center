/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, RequestConfig } from "../device"

export enum BackupCategory {
  Sync = "sync",
  Backup = "backup",
}

export interface StartBackupRequestConfig
  extends RequestConfig<{
    category: BackupCategory
  }> {
  endpoint: Endpoint.Backup
  method: Method.Post
}

export interface StartBackupResponseBody {
  id: string
}

export type GetBackupDeviceStatusRequestConfigBody = StartBackupResponseBody

export interface GetBackupDeviceStatusRequestConfig
  extends RequestConfig<GetBackupDeviceStatusRequestConfigBody> {
  endpoint: Endpoint.Backup
  method: Method.Get
}

export enum GetBackupDeviceStatusDataState {
  Running = "running",
  Error = "error",
  Finished = "finished",
}

export interface GetBackupDeviceStatusResponseBody {
  id: string
  state: GetBackupDeviceStatusDataState
}

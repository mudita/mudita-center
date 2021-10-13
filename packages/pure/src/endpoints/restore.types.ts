/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, RequestConfig } from "../device"

type backupId = string

export interface StartRestoreRequestConfigBody {
  restore: backupId
}

export interface StartRestoreRequestConfig
  extends RequestConfig<StartRestoreRequestConfigBody> {
  endpoint: Endpoint.Restore
  method: Method.Post
}

export interface GetRestoreDeviceStatusRequestConfigBody {
  id: backupId
}

export interface GetRestoreDeviceStatusRequestConfig
  extends RequestConfig<GetRestoreDeviceStatusRequestConfigBody> {
  endpoint: Endpoint.Restore
  method: Method.Get
}

export enum GetRestoreDeviceStatusDataState {
  Running = "running",
  Error = "error",
  Finished = "finished",
}

export interface GetRestoreDeviceStatusResponseBody {
  id: backupId
  state: GetRestoreDeviceStatusDataState
}

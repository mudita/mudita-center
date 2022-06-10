/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetPhoneLockTimeResponseBody,
  MuditaDevice,
  StartRestoreRequestConfigBody,
  GetRestoreDeviceStatusRequestConfigBody,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

export interface DeviceFilesOption {
  datePrefix?: boolean
}

export default abstract class PurePhoneAdapter {
  public abstract disconnectDevice(): Promise<RequestResponse>
  public abstract connectDevice(): Promise<RequestResponse<MuditaDevice>>
  public abstract unlockDevice(code: string): Promise<RequestResponse>
  public abstract getUnlockDeviceStatus(): Promise<RequestResponse>
  public abstract getDeviceLockTime(): Promise<
    RequestResponse<GetPhoneLockTimeResponseBody>
  >
  public abstract getDeviceLogFiles(
    option?: DeviceFilesOption
  ): Promise<RequestResponse<DeviceFile[]>>
  public abstract getDeviceCrashDumpFiles(
    option?: DeviceFilesOption
  ): Promise<RequestResponse<string[]>>
  public abstract downloadDeviceCrashDumpFiles(): Promise<
    RequestResponse<string[]>
  >
  public abstract updateOs(filePath: string): Promise<RequestResponse>
  public abstract startRestoreDevice(
    config: StartRestoreRequestConfigBody
  ): Promise<RequestResponse>
  public abstract getRestoreDeviceStatus(
    config: GetRestoreDeviceStatusRequestConfigBody
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>>
}

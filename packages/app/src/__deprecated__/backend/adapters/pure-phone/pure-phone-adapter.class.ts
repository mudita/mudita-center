/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetRestoreDeviceStatusRequestConfig,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  StartRestoreRequestConfig,
} from "App/device/types/mudita-os"
import { Device } from "App/device/modules/device"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { RequestResponse } from "App/core/types/request-response.interface"

export interface DeviceFilesOption {
  datePrefix?: boolean
}

export default abstract class PurePhoneAdapter {
  public abstract disconnectDevice(): Promise<RequestResponse>
  public abstract connectDevice(): Promise<RequestResponse<Device>>
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
  public abstract startRestoreDevice(
    config: StartRestoreRequestConfig["body"]
  ): Promise<RequestResponse>
  public abstract getRestoreDeviceStatus(
    config: GetRestoreDeviceStatusRequestConfig["body"]
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>>
}

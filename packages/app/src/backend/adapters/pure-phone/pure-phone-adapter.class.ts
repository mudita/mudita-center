/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  GetPhoneLockTimeResponseBody,
  MuditaDevice,
  CaseColour,
} from "@mudita/pure"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"

export interface DeviceFilesOption {
  datePrefix?: boolean
}

export default abstract class PurePhoneAdapter {
  public abstract getName(): string
  public abstract getModelName(): string
  public abstract getModelNumber(): string
  public abstract getSerialNumber(): Promise<DeviceResponse<string>>
  public abstract getOsVersion(): Promise<DeviceResponse<string>>
  public abstract getOsUpdateDate(): string
  public abstract disconnectDevice(): Promise<DeviceResponse>
  public abstract connectDevice(): Promise<DeviceResponse<MuditaDevice>>
  public abstract unlockDevice(code: string): Promise<DeviceResponse>
  public abstract getUnlockDeviceStatus(): Promise<DeviceResponse>
  public abstract getDeviceLockTime(): Promise<
    DeviceResponse<GetPhoneLockTimeResponseBody>
  >
  public abstract getDeviceLogFiles(
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFile[]>>
  public abstract getDeviceCrashDumpFiles(
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<string[]>>
  public abstract downloadDeviceCrashDumpFiles(): Promise<DeviceResponse<string[]>>
  public abstract updateOs(
    filePath: string,
    progressChannel?: string
  ): Promise<DeviceResponse>
  public abstract getCaseColour(): Promise<DeviceResponse<CaseColour>>
}

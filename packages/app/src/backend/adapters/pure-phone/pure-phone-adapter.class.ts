/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"

export interface DeviceLogFilesOption {
  maxBytes?: number
  dateLog?: boolean
}

export interface DeviceFile extends Pick<File, "name"> {
  data: string
  name: string
}

export default abstract class PurePhoneAdapter {
  public abstract getName(): string
  public abstract getModelName(): string
  public abstract getModelNumber(): string
  public abstract getSerialNumber(): Promise<DeviceResponse<string>>
  public abstract getOsVersion(): Promise<DeviceResponse<string>>
  public abstract getOsUpdateDate(): string
  public abstract disconnectDevice(): Promise<DeviceResponse>
  public abstract connectDevice(): Promise<DeviceResponse>
  public abstract unlockDevice(code: string): Promise<DeviceResponse>
  public abstract getUnlockDeviceStatus(): Promise<DeviceResponse>
  public abstract getDeviceLogFiles(
    option?: DeviceLogFilesOption
  ): Promise<DeviceResponse<DeviceFile[]>>
  public abstract updateOs(
    filePath: string,
    progressChannel?: string
  ): Promise<DeviceResponse>
}

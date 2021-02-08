/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneAdapter {
  public abstract getName(): string
  public abstract getModelName(): string
  public abstract getModelNumber(): string
  public abstract getSerialNumber(): string
  public abstract getOsVersion(): Promise<DeviceResponse<string>>
  public abstract getOsUpdateDate(): string
  public abstract disconnectDevice(): DeviceResponse
  public abstract connectDevice(): Promise<DeviceResponse>
  public abstract updateOs(
    updateFilePath: string,
    progressChannel: string
  ): Promise<DeviceResponse> | DeviceResponse
}

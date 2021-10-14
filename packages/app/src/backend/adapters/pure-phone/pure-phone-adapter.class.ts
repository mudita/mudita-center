/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetPhoneLockTimeResponseBody,
  MuditaDevice,
  CaseColour,
  StartBackupResponseBody,
  GetBackupDeviceStatusResponseBody,
  GetBackupDeviceStatusRequestConfigBody,
  StartRestoreRequestConfigBody,
  GetRestoreDeviceStatusRequestConfigBody,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  DeviceFileDeprecated,
  DeviceFile,
  UploadFilePayload,
} from "Backend/device-file-system-service/device-file-system-service"

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
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>>
  public abstract getDeviceCrashDumpFiles(
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>>
  public abstract updateOs(
    filePath: string,
    progressChannel?: string
  ): Promise<DeviceResponse>
  public abstract getCaseColour(): Promise<DeviceResponse<CaseColour>>
  public abstract getBackupLocation(): Promise<DeviceResponse<string>>
  public abstract startBackupDevice(): Promise<
    DeviceResponse<StartBackupResponseBody>
  >
  public abstract getBackupDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody
  ): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>>
  public abstract startRestoreDevice(
    config: StartRestoreRequestConfigBody
  ): Promise<DeviceResponse>
  public abstract getRestoreDeviceStatus(
    config: GetRestoreDeviceStatusRequestConfigBody
  ): Promise<DeviceResponse<GetRestoreDeviceStatusResponseBody>>
  //TODO: move to a separate adapter
  public abstract downloadDeviceFile(
    filePath: string
  ): Promise<DeviceResponse<DeviceFile>>
  public abstract uploadDeviceFile(
    payload: UploadFilePayload
  ): Promise<DeviceResponse>
  public abstract removeDeviceFile(filePath: string): Promise<DeviceResponse>
}

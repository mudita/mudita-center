/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"

export interface DeviceFile extends Pick<File, "name"> {
  data: Buffer
}

export interface EncodedResponse {
  file: string
  fileCrc32?: string
}

export interface UploadFilePayload {
  data: Buffer
  targetPath: string
}

export interface UploadFileLocallyPayload {
  filePath: string
  targetPath: string
}

export default abstract class DeviceFileSystemAdapter {
  public abstract downloadLocally(
    filePaths: string[],
    fileDirectory: string
  ): Promise<DeviceResponse<string[]>>
  public abstract downloadDeviceFiles(
    filePaths: string[]
  ): Promise<DeviceResponse<DeviceFile[]>>
  public abstract downloadFile(
    filePath: string
  ): Promise<DeviceResponse<Buffer>>
  public abstract uploadFile({
    data,
    targetPath,
  }: UploadFilePayload): Promise<DeviceResponse>
  public abstract uploadFileLocally({
    filePath,
    targetPath,
  }: UploadFileLocallyPayload): Promise<DeviceResponse>
}

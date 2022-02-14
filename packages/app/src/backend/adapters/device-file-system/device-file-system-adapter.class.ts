/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import { TokenOptions } from "App/file-system/services/crypto-file-service/crypto-file-service"

export interface DownloadDeviceFileLocallyOptions
  extends Pick<Partial<TokenOptions>, "key"> {
  cwd: string
  token?: string
  extract?: boolean
}

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
  public abstract downloadDeviceFilesLocally(
    filePaths: string[],
    options: DownloadDeviceFileLocallyOptions
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
  public abstract removeDeviceFile(removeFile: string): Promise<DeviceResponse>
}

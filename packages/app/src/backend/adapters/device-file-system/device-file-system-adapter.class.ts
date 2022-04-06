/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TokenOptions } from "App/file-system/services/crypto-file-service/crypto-file-service"
import { RequestResponse } from "App/core/types/request-response.interface"

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
  ): Promise<RequestResponse<string[]>>
  public abstract downloadDeviceFiles(
    filePaths: string[]
  ): Promise<RequestResponse<DeviceFile[]>>
  public abstract downloadFile(
    filePath: string
  ): Promise<RequestResponse<Buffer>>
  public abstract uploadFile({
    data,
    targetPath,
  }: UploadFilePayload): Promise<RequestResponse>
  public abstract uploadFileLocally({
    filePath,
    targetPath,
  }: UploadFileLocallyPayload): Promise<RequestResponse>
  public abstract removeDeviceFile(removeFile: string): Promise<RequestResponse>
}

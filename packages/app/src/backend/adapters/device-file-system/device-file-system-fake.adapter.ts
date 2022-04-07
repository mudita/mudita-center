/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceFileSystemAdapter, {
  DeviceFile,
  DownloadDeviceFileLocallyOptions,
  UploadFilePayload,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class DeviceFileSystemFakeAdapter implements DeviceFileSystemAdapter {
  async downloadDeviceFilesLocally(
    filePaths: string[],
    options: DownloadDeviceFileLocallyOptions
  ): Promise<RequestResponse<string[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  async downloadDeviceFiles(
    filePaths: string[]
  ): Promise<RequestResponse<DeviceFile[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [
        {
          data: Buffer.from("backup data"),
          name: `<YYYY-MM-DD>T<HHMMSS>Z`,
        },
      ],
    }
  }

  async downloadFile(filePath: string): Promise<RequestResponse<Buffer>> {
    return {
      status: RequestResponseStatus.Ok,
      data: Buffer.from("backup data"),
    }
  }

  async uploadFile({
    data,
    targetPath,
  }: UploadFilePayload): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  async uploadFileLocally(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  public async removeDeviceFile(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }
}

const createFakeDeviceFileSystemAdapter = (): DeviceFileSystemFakeAdapter =>
  new DeviceFileSystemFakeAdapter()

export default createFakeDeviceFileSystemAdapter

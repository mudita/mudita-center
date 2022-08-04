/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceFileSystemAdapter, {
  DeviceFile,
  DownloadDeviceFileLocallyOptions,
  UploadFilePayload,
} from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class DeviceFileSystemFakeAdapter implements DeviceFileSystemAdapter {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async downloadDeviceFilesLocally(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filePaths: string[],
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: DownloadDeviceFileLocallyOptions
  ): Promise<RequestResponse<string[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [],
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async downloadDeviceFiles(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async downloadFile(filePath: string): Promise<RequestResponse<Buffer>> {
    return {
      status: RequestResponseStatus.Ok,
      data: Buffer.from("backup data"),
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async uploadFile({
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    targetPath,
  }: UploadFilePayload): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async uploadFileLocally(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async removeDeviceFile(): Promise<RequestResponse> {
    return {
      status: RequestResponseStatus.Ok,
    }
  }
}

const createFakeDeviceFileSystemAdapter = (): DeviceFileSystemFakeAdapter =>
  new DeviceFileSystemFakeAdapter()

export default createFakeDeviceFileSystemAdapter

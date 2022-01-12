/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceFileSystemAdapter, {
  DeviceFile,
  UploadFilePayload,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"

export class DeviceFileSystemFakeAdapter implements DeviceFileSystemAdapter {
  constructor() {}

  async downloadLocally(
    filePaths: string[],
    fileDirectory: string
  ): Promise<DeviceResponse<string[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  async downloadDeviceFiles(
    filePaths: string[]
  ): Promise<DeviceResponse<DeviceFile[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [
        {
          data: Buffer.from("backup data"),
          name: `<YYYY-MM-DD>T<HHMMSS>Z`,
        },
      ],
    }
  }

  async downloadFile(filePath: string): Promise<DeviceResponse<Buffer>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: Buffer.from("backup data"),
    }
  }

  async uploadFile({
    data,
    targetPath,
  }: UploadFilePayload): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  async uploadFileLocally(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }
}

const createFakeDeviceFileSystemAdapter = (): DeviceFileSystemFakeAdapter =>
  new DeviceFileSystemFakeAdapter()

export default createFakeDeviceFileSystemAdapter

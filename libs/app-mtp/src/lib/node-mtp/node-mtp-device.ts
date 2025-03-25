/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UploadFileInfoOptions {
  size: number
  name: string
  storageId: number
  parentObjectHandle: number
}

export class NodeMtpDevice {
  async uploadFileInfo(options: UploadFileInfoOptions): Promise<number> {
    // mock implementation
    return 0
  }

  async uploadFileCommand() {
    // mock implementation
  }

  async uploadFileData(chunk: Buffer | string) {
    // mock implementation
  }
}

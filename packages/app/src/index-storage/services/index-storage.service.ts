/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import getAppPath from "App/main/utils/get-app-path"
import { DataIndex } from "App/index-storage/constants"
import { IndexStorage } from "App/index-storage/types"
import { MetadataStore } from "App/metadata/services"
import { MetadataKey } from "App/metadata/constants"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

const cacheFileNames: Record<DataIndex, string> = {
  [DataIndex.Contact]: "contacts.json",
  [DataIndex.Message]: "messages.json",
  [DataIndex.Thread]: "threads.json",
}

export class IndexStorageService {
  constructor(
    private index: IndexStorage,
    private keyStorage: MetadataStore,
    private fileSystemService: FileSystemService
  ) {}

  public async loadIndex() {
    const token = this.keyStorage.getValue(MetadataKey.DeviceToken) as string
    const serialNumber = this.keyStorage.getValue(
      MetadataKey.DeviceSerialNumber
    ) as string

    if (!token || !serialNumber) {
      return
    }

    Object.entries(cacheFileNames).forEach(async (value) => {
      const [indexName, fileName] = value as [DataIndex, string]

      const data = await this.fileSystemService.readEncryptedFile(
        this.getCacheFilePath(fileName, serialNumber),
        token
      )

      this.index.set(indexName, JSON.parse(data?.toString("utf-8") as string))
    })
  }

  public saveIndex() {
    const token = this.keyStorage.getValue(MetadataKey.DeviceToken) as string
    const serialNumber = this.keyStorage.getValue(
      MetadataKey.DeviceSerialNumber
    ) as string

    if (!token || !serialNumber) {
      return
    }

    Object.entries(cacheFileNames).forEach(async (value) => {
      const [indexName, fileName] = value as [DataIndex, string]
      const data = this.index.get(indexName)

      await this.fileSystemService.writeEncryptedFile(
        this.getCacheFilePath(fileName, serialNumber),
        Buffer.from(JSON.stringify(data)),
        token
      )
    })
  }

  public getCacheFilePath(filePath: string, serialNumber: string): string {
    return path.join(getAppPath(), "cache", serialNumber, filePath)
  }
}

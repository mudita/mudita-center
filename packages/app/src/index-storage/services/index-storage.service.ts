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
import elasticlunr from "elasticlunr"

const cacheFileNames: Record<Exclude<DataIndex, DataIndex.Template>, string> = {
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

  public async loadIndex(): Promise<boolean> {
    const token = String(this.keyStorage.getValue(MetadataKey.DeviceToken))
    const serialNumber = String(
      this.keyStorage.getValue(MetadataKey.DeviceSerialNumber)
    )

    if (!token || !serialNumber) {
      return false
    }

    const files = Object.entries(cacheFileNames)

    const results = await Promise.all<boolean>(
      files.map(async (value) => {
        return new Promise(async (resolve) => {
          const [indexName, fileName] = value as [DataIndex, string]
          const filePath = this.getCacheFilePath(fileName, serialNumber)
          const exists = await this.fileSystemService.exists(filePath)

          if (!exists) {
            resolve(false)
            return
          }

          const data = await this.fileSystemService.readEncryptedFile(
            filePath,
            token
          )

          if (data === undefined) {
            resolve(false)
            return
          }

          try {
            this.index.set(
              indexName,
              elasticlunr.Index.load(JSON.parse(data.toString("utf-8")))
            )
            resolve(true)
          } catch {
            resolve(false)
          }
        })
      })
    )

    return results.every((value: boolean) => value)
  }

  public saveIndex() {
    const token = String(this.keyStorage.getValue(MetadataKey.DeviceToken))
    const serialNumber = String(
      this.keyStorage.getValue(MetadataKey.DeviceSerialNumber)
    )

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

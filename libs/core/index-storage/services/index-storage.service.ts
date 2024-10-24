/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import elasticlunr from "elasticlunr"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { DataIndex } from "Core/index-storage/constants"
import { IndexStorage } from "Core/index-storage/types"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { InitializeOptions } from "Core/data-sync/types"

const cacheFileNames: Partial<Record<DataIndex, string>> = {
  [DataIndex.Contact]: "contacts.json",
  [DataIndex.Message]: "messages.json",
  [DataIndex.Thread]: "threads.json",
  [DataIndex.Template]: "templates.json",
}

export class IndexStorageService {
  constructor(
    private index: IndexStorage,
    private keyStorage: MetadataStore,
    private fileSystemService: FileSystemService
  ) {}

  public async loadIndex({
    token,
    serialNumber,
  }: InitializeOptions): Promise<boolean> {
    const files = Object.entries(cacheFileNames)

    const results = await Promise.all<boolean>(
      files.map(async (value) => {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
        return new Promise(async (resolve) => {
          const [indexName, fileName] = value as [DataIndex, string]
          const filePath = this.getCacheFilePath(fileName, serialNumber)
          const exists = await this.fileSystemService.exists(filePath)

          if (!exists) {
            resolve(false)
            return
          }

          const data = token
            ? await this.fileSystemService.readEncryptedFile(filePath, token)
            : await this.fileSystemService.readFile(filePath)

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

  public async saveIndex({
    token,
    serialNumber,
  }: InitializeOptions): Promise<void> {
    for (const [indexName, fileName] of Object.entries(cacheFileNames)) {
      const data = this.index.get(indexName as DataIndex)

      if (token) {
        await this.fileSystemService.writeEncryptedFile(
          this.getCacheFilePath(fileName, serialNumber),
          Buffer.from(JSON.stringify(data)),
          token
        )
      } else {
        await this.fileSystemService.writeFile(
          this.getCacheFilePath(fileName, serialNumber),
          Buffer.from(JSON.stringify(data))
        )
      }
    }
  }

  public getCacheFilePath(filePath: string, serialNumber: string): string {
    return path.join(getAppPath(), "cache", serialNumber, filePath)
  }
}

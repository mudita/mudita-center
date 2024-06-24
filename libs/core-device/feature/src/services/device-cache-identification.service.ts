/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceIdentification } from "../controllers"

type CacheMap = Record<string, DeviceIdentification>

export class DeviceCacheIdentificationService {
  private readonly filePath = path.join(
    getAppPath(),
    "identification-cache.json"
  )

  constructor(private fileSystem: FileSystemService) {
    void this.init()
  }

  public async getDeviceIdentification(
    id: DeviceId
  ): Promise<DeviceIdentification | undefined> {
    const cacheMap = await this.readCacheMap()
    return cacheMap[id]
  }

  public async saveDeviceIdentification(
    id: DeviceId,
    deviceIdentification: DeviceIdentification
  ): Promise<void> {
    const cacheMap = await this.readCacheMap()
    cacheMap[id] = deviceIdentification
    await this.fileSystem.writeFile(this.filePath, JSON.stringify(cacheMap))
  }

  private async init(): Promise<void> {
    if (!(await this.fileSystem.exists(this.filePath))) {
      await this.fileSystem.writeFile(this.filePath, JSON.stringify({}))
    }
  }

  private async readCacheMap(): Promise<CacheMap> {
    const cache = await this.fileSystem.readFile(this.filePath)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(cache.toString())
  }
}

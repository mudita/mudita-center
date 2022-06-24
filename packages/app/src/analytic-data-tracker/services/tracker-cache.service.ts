/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import { TrackEvent } from "App/analytic-data-tracker/types"

type CacheMap = Record<string, TrackEvent>

export class TrackerCacheService {
  private readonly filePath = path.join(getAppPath(), "track-cache.json")

  constructor(private fileSystem: FileSystemService) {
    void this.init()
  }

  public async isEventUnique(event: TrackEvent): Promise<boolean> {
    const cacheMap = await this.readCacheMap()
    const id = TrackerCacheService.getEventId(event)
    if (id === undefined) {
      return false
    } else {
      return JSON.stringify(cacheMap[id]) !== JSON.stringify(event)
    }
  }

  public async saveEvent(event: TrackEvent): Promise<void> {
    const id = TrackerCacheService.getEventId(event)
    if (id !== undefined) {
      const cacheMap = await this.readCacheMap()
      cacheMap[id] = event
      await this.fileSystem.writeFile(this.filePath, JSON.stringify(cacheMap))
    }
  }

  private async init(): Promise<void> {
    if (!(await this.fileSystem.exists(this.filePath))) {
      await this.fileSystem.writeFile(this.filePath, JSON.stringify({}))
    }
  }

  private async readCacheMap(): Promise<CacheMap> {
    const cache = await this.fileSystem.readFile(this.filePath)
    return JSON.parse(cache.toString())
  }

  private static getEventId(event: TrackEvent): string | undefined {
    if (event.e_c === undefined) {
      return undefined
    } else {
      const _id = event._id ? ` ${event._id}` : ""
      return `${event.e_c}${_id}`
    }
  }
}

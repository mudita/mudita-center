/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import getAppPath from "App/main/utils/get-app-path"

export class TrackerCacheService {
  private readonly filePath = path.join(getAppPath(), "track-cache.txt")

  constructor(private fileSystem: FileSystemService) {
    void this.init()
  }

  public async isEventUnique(event: Object): Promise<boolean> {
    const cache = await this.fileSystem.readFile(this.filePath)
    return !cache.toString().includes(JSON.stringify(event))
  }

  public async saveEvent(event: Object): Promise<void> {
    await this.fileSystem.appendFile(this.filePath, `${JSON.stringify(event)};`)
  }

  private async init(): Promise<void> {
    if (!(await this.fileSystem.exists(this.filePath))) {
      await this.fileSystem.writeFile(this.filePath, "")
    }
  }
}

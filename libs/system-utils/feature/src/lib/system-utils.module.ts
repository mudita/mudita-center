/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Directory } from "./directory/directory.service"
import { FileDialog } from "./file-dialog/file-dialog.service"
import { FileStats } from "./file-stats/file-stats.service"

export class SystemUtilsModule {
  public directory = new Directory()
  public fileDialog = new FileDialog()
  public fileStats = new FileStats()

  constructor() {}

  public getServices() {
    return [this.directory, this.fileDialog, this.fileStats]
  }
}

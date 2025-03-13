/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Directory } from "./directory/directory.service"
import { FileDialog } from "./file-dialog/file-dialog.service"
import { FileStats } from "./file-stats/file-stats.service"
// import { mockServiceEnabled, mockFileDialog } from "e2e-mock-server"
// import { mockServiceEnabled } from "../../../../e2e-mock/server/src/lib/server"

export class SystemUtilsModule {
  constructor(public fileDialog: any) {}

  public directory = new Directory()

  // public fileDialog = new FileDialog()
  public fileStats = new FileStats()

  public getServices() {
    return [this.directory, this.fileDialog, this.fileStats]
  }
}

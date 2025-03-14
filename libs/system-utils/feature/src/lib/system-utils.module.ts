/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MockFileDialog } from "e2e-mock-server"
import { Directory } from "./directory/directory.service"
import { FileDialog } from "./file-dialog/file-dialog.service"
import { FileStats } from "./file-stats/file-stats.service"

export class SystemUtilsModule {
  public fileDialog: FileDialog

  constructor(
    public mockServiceEnabled: boolean,
    public mockFileDialog: MockFileDialog
  ) {
    this.fileDialog = new FileDialog(
      this.mockFileDialog,
      this.mockServiceEnabled
    )
  }

  public directory = new Directory()

  public fileStats = new FileStats()

  public getServices() {
    return [this.directory, this.fileDialog, this.fileStats]
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app, dialog, OpenDialogOptions, BrowserWindow } from "electron"
import { formatMessage } from "app-localize/utils"

export class AppActionsService {
  private readonly defaultOptions: OpenDialogOptions = {
    title: formatMessage({ id: "general.app.title" }),
    filters: [],
    properties: [],
  }

  close() {
    app.quit()
  }

  async openFileDialog(
    options: OpenDialogOptions
  ): Promise<string | undefined> {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
      defaultPath: options.defaultPath || this.defaultOptions.defaultPath,
    }

    const result = await dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow() as BrowserWindow,
      mergedOptions
    )

    if (result.canceled || result.filePaths.length === 0) {
      return undefined
    }

    return result.canceled ? undefined : result.filePaths[0]
  }
}

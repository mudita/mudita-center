/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app, BrowserWindow, dialog, OpenDialogOptions, shell } from "electron"
import * as path from "path"
import { formatMessage } from "app-localize/utils"
import logger from "electron-log"
import { AppFileSystemGuard } from "../app-file-system/app-file-system.guard"

const devToolsEnabled =
  process.env.ENABLE_DEVTOOLS === "true" ||
  process.env.NODE_ENV === "development"

export class AppActionsService {
  private readonly defaultOptions: OpenDialogOptions = {
    title: formatMessage({ id: "general.app.title" }),
    filters: [],
    properties: [],
  }

  constructor(private appFileSystemGuard: AppFileSystemGuard) {}

  async openWindow(url: string, title: string) {
    logger.info(`Opening app window "${title}" (${url})`)

    const win = new BrowserWindow({
      title,
      width: 1000,
      height: 600,
      show: false,
      useContentSize: true,
      autoHideMenuBar: process.env.NODE_ENV !== "development",
      titleBarStyle: "default",
      titleBarOverlay: {
        color: "#FFFFFF",
        symbolColor: "#000000",
        height: 32,
      },
      webPreferences: {
        preload: path.join(__dirname, "..", "preload", "index.js"),
        sandbox: false,
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
      await win.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/${url}`)
    } else {
      const filePath = path.join(__dirname, "..", "renderer", "index.html")
      const hash = url.startsWith("#") ? url.slice(1) : undefined

      await win.loadFile(filePath, hash ? { hash } : undefined)
    }

    win.show()

    if (devToolsEnabled) {
      win.webContents.openDevTools()
    }
  }

  close() {
    app.quit()
  }

  async openFileDialog(
    options: OpenDialogOptions,
    webContentsId: number
  ): Promise<string[]> {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
      defaultPath: options.defaultPath || this.defaultOptions.defaultPath,
    }

    const result = await dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow() as BrowserWindow,
      mergedOptions
    )

    if (result.canceled) {
      return []
    }

    this.appFileSystemGuard.grant(webContentsId, result.filePaths)

    return result.filePaths
  }

  getAppVersion(): string {
    return app.getVersion()
  }

  openExternalLink(url: string): void {
    void shell.openExternal(url)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { callRenderer, getMainAppWindow } from "shared/utils"

export enum AppUpdateEvent {
  Available = "application_updater-available",
  NotAvailable = "application_updater-not-available",
  Error = "application_updater-error",
  Downloaded = "application_updater-downloaded",
}

export abstract class BaseApplicationUpdaterService {
  private window: BrowserWindow

  protected constructor() {
    this.window = getMainAppWindow() as BrowserWindow
  }

  abstract checkForUpdatesAndNotify(): Promise<unknown>
  abstract quitAndInstall(): void
  abstract downloadUpdate(): Promise<unknown>

  protected onUpdateAvailable(version: string): void {
    void callRenderer(AppUpdateEvent.Available, version)
  }

  protected onUpdateNotAvailable(): void {
    void callRenderer(AppUpdateEvent.NotAvailable)
  }

  protected onError(error?: Error): void {
    void callRenderer(AppUpdateEvent.Error, error)
    this.window.setProgressBar(-1)
  }

  protected onDownloadProgress(percent: number): void {
    this.window.setProgressBar(percent / 100)
  }

  protected onUpdateDownloaded(): void {
    void callRenderer(AppUpdateEvent.Downloaded)
    this.window.setProgressBar(-1)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dialog, OpenDialogOptions, BrowserWindow } from "electron"
import {
  FileDialogToMainEvents,
  FileDialogError,
  FileDialogToRendererEvents,
} from "system-utils/models"
import { IpcEvent } from "Core/core/decorators"
import { Result, ResultObject } from "Core/core/builder"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { AppError } from "Core/core/errors"
import { callRenderer } from "shared/utils"
import { MockFileDialog } from "e2e-mock-server"

const defaultOptions: OpenDialogOptions = {
  title: intl.formatMessage({ id: "component.dialog.title" }),
  filters: [],
  properties: [],
}

const defaultDirectoryOptions: OpenDialogOptions = {
  properties: ["openDirectory", "createDirectory"],
  title: "Select folder to export files",
  buttonLabel: "Select Folder",
}

export class FileDialog {
  private lastSelectedPath: string | undefined

  constructor(
    public mockFileDialog: MockFileDialog,
    public mockServiceEnabled: boolean
  ) {}

  @IpcEvent(FileDialogToMainEvents.OpenFile)
  public async openFile({
    options,
  }: {
    options?: OpenDialogOptions
  }): Promise<ResultObject<string[]>> {
    if (this.mockServiceEnabled) {
      const mockFilePaths = this.mockFileDialog.getMockFilePaths()

      return Result.success(mockFilePaths)
    } else {
      callRenderer(FileDialogToRendererEvents.FileDialogOpened)

      const result = await this.performOpenFile(options)

      callRenderer(FileDialogToRendererEvents.FileDialogClosed)

      return result
    }
  }

  @IpcEvent(FileDialogToMainEvents.ChooseDirectory)
  public async chooseDirectory({
    options,
  }: {
    options?: OpenDialogOptions
  }): Promise<ResultObject<string>> {
    if (this.mockServiceEnabled) {
      const mockDirectoryPaths = this.mockFileDialog.getMockDirectoryPath()
      return Result.success(mockDirectoryPaths)
    } else {
      callRenderer(FileDialogToRendererEvents.FileDialogOpened)

      const result = await this.performChooseDirectory(options)

      callRenderer(FileDialogToRendererEvents.FileDialogClosed)

      return result
    }
  }

  public async performOpenFile(
    options: OpenDialogOptions = defaultOptions
  ): Promise<ResultObject<string[]>> {
    try {
      const openDialogOptions = {
        ...defaultOptions,
        ...options,
        defaultPath: options.defaultPath || this.lastSelectedPath,
      }

      const result = await dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow() as BrowserWindow,
        openDialogOptions
      )
      if (result.canceled) {
        return Result.failed(
          new AppError(FileDialogError.OpenFile, "cancelled")
        )
      }
      this.lastSelectedPath = result.filePaths[0]

      return Result.success(result.filePaths)
    } catch (error) {
      return Result.failed(
        new AppError(
          FileDialogError.OpenFile,
          error ? (error as Error).message : undefined
        )
      )
    }
  }

  public async performChooseDirectory(
    options: OpenDialogOptions = defaultDirectoryOptions
  ): Promise<ResultObject<string>> {
    try {
      const openDialogOptions: OpenDialogOptions = {
        ...defaultDirectoryOptions,
        ...options,
        defaultPath: options.defaultPath || this.lastSelectedPath,
      }

      const result = await dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow() as BrowserWindow,
        openDialogOptions
      )

      if (result.canceled) {
        return Result.failed(
          new AppError(FileDialogError.ChooseDirectory, "cancelled")
        )
      }

      this.lastSelectedPath = result.filePaths[0]

      return Result.success(result.filePaths[0])
    } catch (error) {
      return Result.failed(
        new AppError(
          FileDialogError.ChooseDirectory,
          error ? (error as Error).message : undefined
        )
      )
    }
  }
}

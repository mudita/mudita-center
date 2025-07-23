/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app, shell } from "electron"
import { IpcEvent } from "Core/core/decorators"
import { DirectoryServiceEvents } from "system-utils/models"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { GeneralError } from "device/models"
import path from "path"
import { ensureDir, pathExists, remove } from "fs-extra"

type SystemPathType = Parameters<typeof app.getPath>[0]

const appPathType = {
  root: [],
  logs: ["logs"],
  settings: ["settings.json"],
  pure: ["pure"],
  pureBackups: ["pure", "phone", "backups"],
  pureBackupTemp: ["pure", "phone", "backup-temp"],
  helpV2: ["help-v2.json"],
  filePreview: ["file-preview"],
} as const

export type AppPathType = keyof typeof appPathType

export type CheckPathResult<E extends boolean> = E extends true ? true : boolean

export class Directory {
  constructor() {}

  @IpcEvent(DirectoryServiceEvents.OpenDirectory)
  public async open({ path }: { path: string }) {
    const errorMessage = await shell.openPath(path)
    if (errorMessage) {
      return Result.failed(
        new AppError(GeneralError.InternalError, errorMessage)
      )
    }
    return Result.success(undefined)
  }

  private getSystemPath(type: SystemPathType) {
    return Result.success(app.getPath(type))
  }

  @IpcEvent(DirectoryServiceEvents.GetAppPath)
  public getAppPath(type: AppPathType) {
    const baseAppPath = path.join(
      this.getSystemPath("appData").data,
      "@mudita",
      "mudita-center-app",
      ...appPathType[type]
    )

    return Result.success(baseAppPath)
  }

  @IpcEvent(DirectoryServiceEvents.CheckPath)
  public async checkPath<E extends boolean>({
    path,
    ensureExists,
  }: {
    path: string
    ensureExists?: E
  }) {
    if (ensureExists) {
      await ensureDir(path)
    }
    const exists = (await pathExists(path)) as E extends true ? true : boolean
    return Result.success(exists)
  }

  @IpcEvent(DirectoryServiceEvents.RemoveDirectory)
  public async removeDirectory(path: string) {
    await remove(path)
    const exists = await pathExists(path)
    if (!exists) {
      return Result.success(undefined)
    }
    return Result.failed(
      new AppError(
        GeneralError.InternalError,
        `Directory at path "${path}" was not removed`
      )
    )
  }
}

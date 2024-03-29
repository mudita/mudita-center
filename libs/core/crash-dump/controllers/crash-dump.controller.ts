/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { RequestResponse } from "Core/core/types"
import { SettingsService } from "Core/settings/services"
import { IpcCrashDumpEvent } from "Core/crash-dump/constants"
import { CrashDumpService } from "Core/crash-dump/services"

export class CrashDumpController {
  constructor(
    private crashDumpService: CrashDumpService,
    private settingsService: SettingsService
  ) {}

  @IpcEvent(IpcCrashDumpEvent.DownloadCrashDump)
  public async downloadFile(): Promise<RequestResponse<string[]>> {
    const result = await this.crashDumpService.downloadDeviceCrashDumpFiles()
    this.settingsService.updateSettings({
      key: "ignoredCrashDumps",
      value: [],
    })
    return result
  }

  @IpcEvent(IpcCrashDumpEvent.GetFiles)
  public async getFiles(): Promise<RequestResponse<string[]>> {
    return this.crashDumpService.getDeviceCrashDumpFiles()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  @IpcEvent(IpcCrashDumpEvent.Ignore)
  public async ignoreFile(url: string): Promise<void> {
    const ignoredCrashDumps =
      this.settingsService.getSettings().ignoredCrashDumps || []
    const updatedUniqueList = [...new Set([...ignoredCrashDumps, url])]
    this.settingsService.updateSettings({
      key: "ignoredCrashDumps",
      value: updatedUniqueList,
    })
  }
}

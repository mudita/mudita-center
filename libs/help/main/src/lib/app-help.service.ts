/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { pathExists } from "fs-extra"
import { AppResult } from "app-utils/models"
import { AppHttpService, JsonStoreService } from "app-utils/main"
import { HelpData, SerializableHelpData } from "help/models"
import defaultHelp from "./default-help.json"

const helpPath = path.join(process.cwd(), "help-v2.json")

export class AppHelpService {
  private readonly jsonStore: JsonStoreService<SerializableHelpData>

  constructor(private appHttpService: AppHttpService) {
    this.jsonStore = new JsonStoreService<SerializableHelpData>(
      "help",
      defaultHelp as SerializableHelpData
    )
  }

  async initialize(): Promise<void> {
    const helpExists = await pathExists(helpPath)
    if (helpExists) {
      return
    }
    const helpDataResult = await this.getNewestData()

    if (!helpDataResult.ok) {
      return
    }

    this.jsonStore.set(helpDataResult.data as SerializableHelpData)
    console.info("[AppHelpService] Default help data initialized")
  }

  async getData(): Promise<HelpData> {
    return this.jsonStore.get()
  }

  private async getNewestData(
    nextSyncToken?: string
  ): Promise<AppResult<HelpData>> {
    return this.appHttpService.request({
      method: "GET",
      url: `${process.env.MUDITA_CENTER_SERVER_URL}/help-v2`,
      params: { nextSyncToken },
      responseType: "json",
    })
  }
}

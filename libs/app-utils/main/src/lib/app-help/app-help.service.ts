/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { pathExists, readJSON, writeJSON } from "fs-extra"
import defaultHelp from "./default-help.json"
import { HelpData } from "./app-help.types"

const helpPath = path.join(process.cwd(), "help-v2.json") // albo getAppPath() jeśli masz helper

export class AppHelpService {
  async initialize(): Promise<void> {
    const helpExists = await pathExists(helpPath)
    if (!helpExists) {
      await writeJSON(helpPath, defaultHelp)
      console.info("[AppHelpService] Default help data initialized")
    }
  }

  async getData(): Promise<HelpData> {
    return readJSON(helpPath)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { app } from "electron"
import packageInfo from "../../../package.json"
import { AppSettings } from "App/main/store/settings.interface"

const getAppSettingsMain = (): Promise<AppSettings> => {
  return fs.readJSON(
    `${app.getPath("appData")}/${packageInfo.name}/settings.json`
  )
}

export default getAppSettingsMain

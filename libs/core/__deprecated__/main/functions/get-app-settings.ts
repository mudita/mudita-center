/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { app } from "electron"
import packageInfo from "../../../../../apps/mudita-center/package.json"
import { Settings } from "Core/settings/dto"

const getAppSettingsMain = (): Promise<Settings> => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fs.readJSON(
    `${app.getPath("appData")}/${packageInfo.name}/settings.json`
  )
}

export default getAppSettingsMain

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { Settings } from "Core/settings/dto"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"

const getAppSettingsMain = (): Promise<Settings> => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fs.readJSON(getAppPath("settings.json"))
}

export default getAppSettingsMain

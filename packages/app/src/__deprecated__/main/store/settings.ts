/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import settingsSchema from "App/__deprecated__/main/store/settings.schema"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"

const settingsStore = new Store({
  name: "settings",
  cwd: getAppPath(),
  schema: settingsSchema,
  clearInvalidConfig: process.env.NODE_ENV === "production",
})

export default settingsStore

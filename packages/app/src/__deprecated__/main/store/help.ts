/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { app } from "electron"
import packageInfo from "../../../../package.json"

const helpStore = new Store({
  name: "help",
  cwd: `${app.getPath("appData")}/${packageInfo.name}`,
})

export default helpStore

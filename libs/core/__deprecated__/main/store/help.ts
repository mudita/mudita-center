/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"

const helpStore = new Store({
  name: "help",
  cwd: getAppPath(),
})

export default helpStore

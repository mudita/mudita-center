/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ContextMenu from "App/context-menu/context-menu"
import {
  isDevModeEnabled,
  toggleDevMode,
} from "App/dev-mode/store/dev-mode.helpers"

const devModeHidden = process.env.DEVELOPER_MODE_HIDE === "true"
const productionEnvironment = process.env.NODE_ENV === "production"

const appContextMenu = new ContextMenu(
  devModeHidden && productionEnvironment
    ? {
        toggler: toggleDevMode,
      }
    : {
        isEnabled: isDevModeEnabled,
        toggler: toggleDevMode,
      }
)

export default appContextMenu

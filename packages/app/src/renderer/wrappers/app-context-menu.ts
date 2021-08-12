/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ContextMenu from "App/context-menu/context-menu"
import {
  isDevModeEnabled,
  toggleDevMode,
} from "App/dev-mode/store/dev-mode.helpers"

const appContextMenu = new ContextMenu(
  process.env.NODE_ENV !== "production"
    ? {
        isEnabled: isDevModeEnabled,
        toggler: toggleDevMode,
      }
    : {
        toggler: toggleDevMode,
      }
)

export default appContextMenu

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ContextMenu from "App/context-menu/context-menu"
import {
  isDevModeEnabled,
  toggleDevMode,
} from "App/dev-mode/store/dev-mode.helpers"

const appContextMenu = new ContextMenu({
  isEnabled: isDevModeEnabled,
  toggler: toggleDevMode,
})

export default appContextMenu

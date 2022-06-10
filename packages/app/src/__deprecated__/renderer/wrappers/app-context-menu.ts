/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ContextMenu from "App/__deprecated__/context-menu/context-menu"
import {
  isDevModeEnabled,
  toggleDevMode,
} from "App/__deprecated__/dev-mode/store/dev-mode.helpers"

const appContextMenu = new ContextMenu({
  isEnabled: isDevModeEnabled,
  toggler: toggleDevMode,
})

export default appContextMenu

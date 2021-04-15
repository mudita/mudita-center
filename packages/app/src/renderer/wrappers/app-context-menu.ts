/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ContextMenu from "App/context-menu/context-menu"
import {
  isDevModeEnabled,
  toggleDevMode,
  togglePhraseTooltip,
} from "App/dev-mode/store/dev-mode.helpers"

const appContextMenu = new ContextMenu({
  isEnabled: isDevModeEnabled,
  toggler: toggleDevMode,
  phraseToggler: togglePhraseTooltip,
})

export default appContextMenu

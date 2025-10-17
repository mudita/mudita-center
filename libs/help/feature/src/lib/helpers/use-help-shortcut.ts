/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useStore } from "react-redux"
import { selectHelpShortcut } from "../store/help.selectors"
import { AppStore } from "app-store/models"
import { useAppNavigate } from "app-routing/utils"
import { HelpPaths } from "help/models"
// eslint-disable-next-line @nx/enforce-module-boundaries
import helpData from "../../../../main/src/lib/default-help.json"

type HelpShortcutKey = keyof typeof helpData.shortcuts

export const useHelpShortcut = () => {
  const navigate = useAppNavigate()
  const store = useStore<AppStore>()

  return (shortcutKey: HelpShortcutKey) => {
    const shortcut = selectHelpShortcut(store.getState(), shortcutKey)
    if (!shortcut) {
      console.error(`Help shortcut "${shortcut}" does not exist`)
    }
    const { categoryId, articleId } = shortcut

    if (!categoryId || !articleId) {
      console.error(`Help shortcut "${shortcut}" is not properly configured`)
    }

    navigate(`${HelpPaths.Index}/${categoryId}/${articleId}`)
  }
}

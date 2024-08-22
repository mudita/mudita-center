/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useHistory } from "react-router"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { useSelector } from "react-redux"
import { selectHelpShortcuts } from "./selectors"
import helpData from "../../../feature/src/lib/default-help.json"

export const useHelpShortcut = () => {
  const history = useHistory()
  const shortcuts = useSelector(selectHelpShortcuts)

  return (shortcut: keyof typeof helpData.shortcuts) => {
    if (!shortcuts[shortcut]) {
      console.error(`Help shortcut "${shortcut}" does not exist`)
    }
    const { categoryId, articleId } = shortcuts[shortcut]

    if (!categoryId || !articleId) {
      console.error(`Help shortcut "${shortcut}" is not properly configured`)
    }

    history.push(`${URL_MAIN.help}/${categoryId}/${articleId}`)
  }
}

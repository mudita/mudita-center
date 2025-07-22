/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import {
  ArticlePage,
  HelpPage,
  useHelpSyncListener,
  useHelp,
} from "help/feature"
import { HelpLayout, messages } from "./layout"
import { helpPaths } from "help/models"
import { MenuIndex } from "app-routing/models"

export const useHelpRouter = () => {
  useMenuItemsRegister(MenuIndex.App, [
    {
      index: 1,
      title: formatMessage(messages.title),
      icon: IconType.Help,
      path: helpPaths.index,
    },
  ])
  useHelp()
  useHelpSyncListener()

  return (
    <Route element={<HelpLayout />}>
      <Route path={helpPaths.index} element={<HelpPage />} />
      <Route path={helpPaths.category} element={<HelpPage />} />
      <Route path={helpPaths.article} element={<ArticlePage />} />
    </Route>
  )
}

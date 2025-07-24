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
import { HelpPaths } from "help/models"
import { MenuIndex } from "app-routing/models"

export const useHelpRouter = () => {
  useMenuItemsRegister(MenuIndex.App, [
    {
      index: 1,
      title: formatMessage(messages.title),
      icon: IconType.Help,
      path: HelpPaths.Index,
    },
  ])
  useHelp()
  useHelpSyncListener()

  return (
    <Route element={<HelpLayout />}>
      <Route path={HelpPaths.Index} element={<HelpPage />} />
      <Route path={HelpPaths.Category} element={<HelpPage />} />
      <Route path={HelpPaths.Article} element={<ArticlePage />} />
    </Route>
  )
}

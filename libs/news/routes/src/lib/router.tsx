/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { IconType } from "app-theme/models"
import { NewsPage } from "news/feature"
import { formatMessage } from "app-localize/utils"
import { messages, NewsLayout } from "./layout"
import { MenuIndex } from "app-routing/models"
import { NewsPaths } from "news/models"

export const useNewsRouter = () => {
  useMenuItemsRegister(MenuIndex.Basic, [
    {
      title: formatMessage(messages.title),
      icon: IconType.News,
      path: NewsPaths.Index,
    },
  ])

  return (
    <Route element={<NewsLayout />}>
      <Route path={NewsPaths.Index} element={<NewsPage />} />
    </Route>
  )
}

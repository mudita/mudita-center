/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { IconType } from "app-theme/models"
import { NewsPage } from "news/feature"
import { formatMessage } from "app-localize/feature"
import { messages, NewsLayout } from "./layout"
import { newsPaths } from "./paths"

export const useNewsRouter = () => {
  useMenuItemsRegister(0, [
    {
      index: 0,
      title: formatMessage(messages.title),
      icon: IconType.News,
      path: newsPaths.index,
    },
  ])

  return (
    <Route element={<NewsLayout />}>
      <Route path={newsPaths.index} element={<NewsPage />} />
    </Route>
  )
}

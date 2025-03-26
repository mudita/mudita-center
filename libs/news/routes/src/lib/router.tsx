/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { IconType } from "app-theme/models"
import { NewsPage } from "news/feature"
import { formatMessage } from "app-localize/utils"
import { messages, NewsLayout } from "./layout"
import { newsPaths } from "./paths"
import { MenuIndex } from "app-routing/models"

export const useNewsRouter = () => {
  useMenuItemsRegister(MenuIndex.Basic, [
    {
      title: formatMessage(messages.title),
      icon: IconType.News,
      path: newsPaths.index,
    },
  ])

  return (
    <>
      <Route path={"/"} element={<Navigate to={newsPaths.index} />} />
      <Route element={<NewsLayout />}>
        <Route path={newsPaths.index} element={<NewsPage />} />
      </Route>
    </>
  )
}

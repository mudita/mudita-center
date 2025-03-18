/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { IconType } from "app-theme/models"
import { formatMessage } from "app-localize/feature"
import { HelpPage } from "help/feature"
import { HelpLayout, messages } from "./layout"
import { helpPaths } from "./paths"
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

  return (
    <Route element={<HelpLayout />}>
      <Route path={helpPaths.index} element={<HelpPage />} />
    </Route>
  )
}

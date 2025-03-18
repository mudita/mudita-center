/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route } from "react-router"
import { useMenuItemsRegister } from "app-routing/feature"
import { SettingsAboutPage, SettingsBackupPage } from "settings/feature"
import { IconType } from "app-theme/models"
import { formatMessage } from "app-localize/feature"
import { messages, SettingsLayout } from "./layout"
import { settingsPaths } from "./paths"
import { MenuIndex } from "app-routing/models"

export const useSettingsRouter = () => {
  useMenuItemsRegister(MenuIndex.App, [
    {
      index: 0,
      title: formatMessage(messages.settings),
      icon: IconType.Settings,
      path: settingsPaths.index,
    },
  ])

  return (
    <Route element={<SettingsLayout />}>
      <Route
        path={settingsPaths.index}
        element={<Navigate to={settingsPaths.backup} />}
      />
      <Route path={settingsPaths.backup} element={<SettingsBackupPage />} />
      <Route path={settingsPaths.about} element={<SettingsAboutPage />} />
    </Route>
  )
}

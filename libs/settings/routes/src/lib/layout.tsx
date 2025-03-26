/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DashboardHeaderTabs,
  DashboardHeaderTitle,
  Tab,
} from "app-routing/feature"
import { Outlet } from "react-router"
import { settingsPaths } from "./paths"
import { defineMessages, formatMessage } from "app-localize/utils"
import { IconType } from "app-theme/models"

export const messages = defineMessages({
  settings: {
    id: "page.settings.title",
  },
  backup: {
    id: "page.settingsBackup.title",
  },
  about: {
    id: "page.settingsAbout.title",
  },
})

const tabs: Tab[] = [
  {
    title: formatMessage(messages.backup),
    icon: IconType.BackupFolder,
    path: settingsPaths.backup,
  },
  {
    title: formatMessage(messages.about),
    icon: IconType.MuditaLogo,
    path: settingsPaths.about,
  },
]

export const SettingsLayout = () => {
  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.settings)} />
      <DashboardHeaderTabs tabs={tabs} />
      <Outlet />
    </>
  )
}

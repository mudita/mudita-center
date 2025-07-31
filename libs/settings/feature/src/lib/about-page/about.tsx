/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { About } from "settings/ui"
import { useSelector } from "react-redux"
import {
  checkForAppUpdate,
  downloadAndInstallAppUpdate,
  selectAppUpdaterCurrentVersion,
  selectAppUpdaterNewVersion,
  selectAppUpdaterUpdateAvailable,
} from "app-updater/feature"
import { useAppDispatch } from "app-store/utils"

export const SettingsAboutPage: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const currentVersion = useSelector(selectAppUpdaterCurrentVersion)
  const newVersion = useSelector(selectAppUpdaterNewVersion)
  const updateAvailable = useSelector(selectAppUpdaterUpdateAvailable)

  const handleAppUpdateDownload = () => {
    dispatch(downloadAndInstallAppUpdate())
  }

  const handleAppUpdateAvailableCheck = () => {
    dispatch(checkForAppUpdate())
  }

  return (
    <About
      appLatestVersion={newVersion}
      appCurrentVersion={currentVersion}
      appUpdateAvailable={updateAvailable}
      onAppUpdateAvailableCheck={handleAppUpdateAvailableCheck}
      onProcessDownload={handleAppUpdateDownload}
    />
  )
}

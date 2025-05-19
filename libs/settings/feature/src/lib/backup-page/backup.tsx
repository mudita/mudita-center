/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect, useState } from "react"
import { AppSettings } from "app-settings/renderer"
import { Backup } from "settings/ui"
import { AppActions } from "app-utils/renderer"

export const SettingsBackupPage: FunctionComponent = () => {
  const [backupLocation, setBackupLocation] = useState<string>("")

  useEffect(() => {
    const fetchBackupLocation = async () => {
      const settings = await AppSettings.get()
      setBackupLocation(settings.user.backupLocation)
    }

    void fetchBackupLocation()
  }, [])

  const openDialog = async () => {
    const location = await AppActions.openFileDialog({
      properties: ["openDirectory"],
      title: "Choose backup folder",
    })

    if (location) {
      const currentSettings = await AppSettings.get()

      await AppSettings.set({
        ...currentSettings,
        user: {
          ...currentSettings.user,
          backupLocation: location,
        },
      })
      setBackupLocation(location)
    }
  }

  return <Backup backupLocation={backupLocation} openDialog={openDialog} />
}

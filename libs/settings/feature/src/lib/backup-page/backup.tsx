/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { AppSettings } from "app-settings/renderer"
import { Backup } from "settings/ui"
import { appActions } from "app-utils/main"

export const SettingsBackupPage: FunctionComponent = () => {
  const [backupLocation, setBackupLocation] = useState<string>("")

  useEffect(() => {
    const fetchBackupLocation = async () => {
      const settings = await AppSettings.get()
      setBackupLocation(settings.user.backupLocation)
    }

    void fetchBackupLocation()
  }, [])

  const changeSettings = async () => {
    const settings = await AppSettings.get()
    void AppSettings.set({
      user: {
        privacyPolicyAccepted: !settings.user.privacyPolicyAccepted,
      },
    })
  }

  const openDialog = async () => {
    // const location = await appActions.openFileDialog({
    //   properties: ["openDirectory"],
    //   title: "Choose backup folder",
    // })
    // console.log("Nowa lokalizacja: ", location)
    // if (location) {
    //   setBackupLocation(location)
    // }
  }

  return <Backup backupLocation={backupLocation} openDialog={openDialog} />
}

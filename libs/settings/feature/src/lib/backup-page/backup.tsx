/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { AppSettings } from "app-settings/renderer"
import { Backup } from "settings/ui"

export const SettingsBackupPage: FunctionComponent = () => {
  const changeSettings = async () => {
    const settings = await AppSettings.get()
    AppSettings.set({
      user: {
        privacyPolicyAccepted: !settings.user.privacyPolicyAccepted,
      },
    })
  }

  const openDialog = () => {
    console.log("Dialog opened!")
  }

  return <Backup backupLocation={"test"} openDialog={openDialog} />
}

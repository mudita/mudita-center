/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { AppSettings } from "app-settings/renderer"

export const SettingsBackupPage: FunctionComponent = () => {
  const changeSettings = async () => {
    const settings = await AppSettings.get()
    void AppSettings.set({
      user: {
        privacyPolicyAccepted: !settings.user.privacyPolicyAccepted,
      },
    })
  }

  return (
    <div>
      <h1>Settings Backup Page</h1>
      <p>This is the backup page for the settings module.</p>
      <button onClick={changeSettings}>Change Settings</button>
    </div>
  )
}

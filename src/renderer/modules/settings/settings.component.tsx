/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { AppSettings } from "App/main/store/settings.interface"
import { noop } from "Renderer/utils/noop"

export interface SettingsProps {
  appAutostart: boolean
  appTethering: boolean
  setAutostart?: (option: AppSettings["appAutostart"]) => void
  setTethering?: (option: AppSettings["appTethering"]) => void
  checkAutostartValue?: () => Promise<boolean>
}

const Settings: FunctionComponent<SettingsProps> = ({
  appAutostart,
  appTethering,
  setAutostart = noop,
  setTethering = noop,
  checkAutostartValue = noop,
}) => {
  useEffect(() => {
    checkAutostartValue()
  }, [])
  return (
    <SettingsUI
      appAutostart={appAutostart}
      appTethering={appTethering}
      setAutostart={setAutostart}
      setTethering={setTethering}
    />
  )
}

export default Settings

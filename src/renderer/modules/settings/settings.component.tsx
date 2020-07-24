import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { AppSettings } from "App/main/default-app-settings"
import { noop } from "Renderer/utils/noop"

export interface SettingsProps {
  appAutostart: boolean
  appTethering: boolean
  setAutostart?: (option: boolean) => void
  setTethering?: (option: boolean) => void
  updateSettings: (settings: Partial<AppSettings>) => void
}

const Settings: FunctionComponent<SettingsProps> = ({
  appAutostart,
  appTethering,
  setAutostart = noop,
  setTethering = noop,
}) => {
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

import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

interface Props {
  appAutostart: boolean
  appTethering: boolean
  loadSettings: () => void
  setAutostart: (option: boolean) => void
  setTethering: (option: boolean) => void
}

const Settings: FunctionComponent<Props> = ({
  appAutostart,
  appTethering,
  setAutostart,
  setTethering,
  loadSettings,
}) => {
  useEffect(() => {
    loadSettings()
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

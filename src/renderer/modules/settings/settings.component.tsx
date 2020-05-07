import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

interface Props {
  appAutostart: boolean
  appTethering: boolean
  loadSettings: () => void
  setAutostart: (option: Record<Option.Autostart, boolean>) => void
  setTethering: (option: Record<Option.Tethering, boolean>) => void
}

const Settings: FunctionComponent<Props> = ({
  appAutostart,
  appTethering,
  setAutostart,
  setTethering,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
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

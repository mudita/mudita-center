import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

interface Props {
  autostart: boolean
  tethering: boolean
  loadSettings: () => void
  setAutostart: (option: Record<string, boolean>) => void
  setTethering: (option: Record<string, boolean>) => void
}

const Settings: FunctionComponent<Props> = ({
  autostart,
  tethering,
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
      autostart={autostart}
      tethering={tethering}
      setAutostart={setAutostart}
      setTethering={setTethering}
    />
  )
}

export default Settings

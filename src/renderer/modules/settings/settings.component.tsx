import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

interface Props {
  autostart: ToggleState
  tethering: ToggleState
  loadSettings: () => void
  setAutostart: (option: Record<string, ToggleState>) => void
  setTethering: (option: Record<string, ToggleState>) => void
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

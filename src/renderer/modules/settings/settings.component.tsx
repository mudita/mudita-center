import React, { useEffect } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

interface Props {
  autostart: ToggleState
  tethering: ToggleState
  loadSettings: () => void
}

const Settings: FunctionComponent<Props> = ({
  autostart,
  tethering,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
  }, [])
  return <SettingsUI autostart={autostart} tethering={tethering} />
}

export default Settings

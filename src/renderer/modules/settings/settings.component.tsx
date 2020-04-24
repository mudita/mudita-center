import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const Settings: FunctionComponent = () => {
  const [autostart, setAutostart] = useState<ToggleState>(ToggleState.Off)
  const [tethering, setTethering] = useState<ToggleState>(ToggleState.Off)
  return (
    <SettingsUI
      togglerState={twoStateToggler}
      autostart={autostart}
      setAutostart={setAutostart}
      tethering={tethering}
      setTethering={setTethering}
    />
  )
}

export default Settings

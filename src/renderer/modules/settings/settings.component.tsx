import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/modules/settings/settings-ui.component"
import {
  ToggleState,
  twoStateToggler,
} from "Renderer/modules/settings/settings.enum"

const Settings: FunctionComponent = () => {
  const [autostartStatus, setAutostartStatus] = useState<ToggleState>(
    ToggleState.Off
  )
  const [tetheringStatus, setTetheringStatus] = useState<ToggleState>(
    ToggleState.Off
  )
  return (
    <SettingsUI
      autostartStatus={autostartStatus}
      tetheringStatus={tetheringStatus}
      setAutostartStatus={setAutostartStatus}
      setTetheringStatus={setTetheringStatus}
      togglerState={twoStateToggler}
    />
  )
}

export default Settings

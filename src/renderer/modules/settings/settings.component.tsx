import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/modules/settings/settings-ui.component"

export enum ToggleState {
  On = "On",
  Off = "Off",
}

export const twoStateToggler = [ToggleState.Off, ToggleState.On] as const

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

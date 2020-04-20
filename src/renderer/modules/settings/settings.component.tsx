import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/modules/settings/settings-ui.component"

export enum ToggleState {
  On = "On",
  Off = "Off",
}

const twoStateToggler = [ToggleState.Off, ToggleState.On]

const Settings: FunctionComponent = () => {
  const [autostartStatus, setAutostartStatus] = useState<string>(
    twoStateToggler[0]
  )
  const [tetheringStatus, setTetheringStatus] = useState<string>(
    twoStateToggler[0]
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

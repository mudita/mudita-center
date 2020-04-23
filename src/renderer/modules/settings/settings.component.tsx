import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"

const Settings: FunctionComponent = () => {
  return <SettingsUI togglerState={twoStateToggler} />
}

export default Settings

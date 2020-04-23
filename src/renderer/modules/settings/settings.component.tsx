import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { twoStateToggler } from "Renderer/modules/settings/settings.enum"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

const Settings: FunctionComponent = () => {
  return <SettingsUI togglerState={twoStateToggler} />
}

export default Settings

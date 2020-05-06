import { storiesOf } from "@storybook/react"
import React from "react"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

storiesOf("Settings|Settings(connection)", module).add(
  "Settings(connection)",
  () => (
    <div style={{ maxWidth: "63rem" }}>
      <SettingsUI autostart={ToggleState.Off} tethering={ToggleState.Off} />
    </div>
  )
)

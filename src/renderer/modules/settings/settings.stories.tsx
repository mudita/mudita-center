import { storiesOf } from "@storybook/react"
import React from "react"
import Settings from "Renderer/modules/settings/settings.component"

storiesOf("Settings|Settings(connection)", module).add(
  "Settings(connection)",
  () => (
    <div style={{ maxWidth: "63rem" }}>
      <Settings />
    </div>
  )
)

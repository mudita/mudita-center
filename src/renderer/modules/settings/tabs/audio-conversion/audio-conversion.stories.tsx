import { storiesOf } from "@storybook/react"
import React from "react"
import AudioConversion from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"

storiesOf("Settings|Audio Conversion", module).add("Audio Conversion", () => (
  <div style={{ maxWidth: "63rem" }}>
    <AudioConversion />
  </div>
))

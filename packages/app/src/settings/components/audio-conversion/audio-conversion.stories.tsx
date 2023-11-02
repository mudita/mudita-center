import React from "react"
import AudioConversionUI from "App/settings/components/audio-conversion/audio-conversion-ui.component"
import {
  conversionFormatRadioGroup,
  conversionRadioGroup,
} from "App/settings/components/audio-conversion/audio-conversion.component"

export default {
  title: "Settings/Audio Conversion",
}

export const AudioConversion = () => (
  <div style={{ maxWidth: "63rem" }}>
    <AudioConversionUI
      appNonStandardAudioFilesConversion={false}
      conversionRadioGroup={conversionRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
    />
  </div>
)

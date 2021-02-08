/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import AudioConversionUI from "Renderer/components/rest/settings/audio-conversion-ui.component"
import {
  conversionFormatRadioGroup,
  conversionRadioGroup,
} from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"

storiesOf("Settings/Audio Conversion", module).add("Audio Conversion", () => (
  <div style={{ maxWidth: "63rem" }}>
    <AudioConversionUI
      appNonStandardAudioFilesConversion={false}
      conversionRadioGroup={conversionRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
    />
  </div>
))

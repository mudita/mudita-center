/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { AudioConversion } from "App/settings/components/audio-conversion/audio-conversion.component"
import {
  loadSettings,
  setConversionFormat,
  setConvert,
  setNonStandardAudioFilesConversion,
} from "App/settings/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  nonStandardAudioFilesConversion:
    state.settings.nonStandardAudioFilesConversion,
  convert: state.settings.convert,
  conversionFormat: state.settings.conversionFormat,
})

const mapDispatchToProps = {
  setNonStandardAudioFilesConversion,
  setConvert,
  setConversionFormat,
  loadSettings,
}

export const AudioConversionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioConversion)

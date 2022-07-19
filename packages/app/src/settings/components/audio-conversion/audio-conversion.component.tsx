/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import AudioConversionUI from "App/settings/components/audio-conversion/audio-conversion-ui.component"
import { ConversionFormat, Convert } from "App/settings/constants"

export const conversionRadioGroup = [
  {
    value: "Always ask",
    label: intl.formatMessage({
      id: "module.settings.audioConversionAlwaysAskLabel",
    }),
  },
  {
    value: "Convert automatically",
    label: intl.formatMessage({
      id: "module.settings.audioConversionConvertAutomatically",
    }),
  },
]

export const conversionFormatRadioGroup = [
  {
    value: "FLAC",
    label: "FLAC",
    subLabel: intl.formatMessage({
      id: "module.settings.audioConversionConversionFormatFlacSubLabel",
    }),
  },
  {
    value: "WAV",
    label: `WAV (${intl.formatMessage({
      id: "module.settings.audioConversionConversionFormatWavLabel",
    })})`,
    subLabel: intl.formatMessage({
      id: "module.settings.audioConversionConversionFormatWavSubLabel",
    }),
  },
  {
    value: "MP3",
    label: "MP3",
    subLabel: intl.formatMessage({
      id: "module.settings.audioConversionConversionFormatMp3SubLabel",
    }),
  },
]

export interface AudioConversionProps {
  nonStandardAudioFilesConversion: boolean
  convert: Convert
  conversionFormat: ConversionFormat
  setNonStandardAudioFilesConversion: (option: boolean) => void
  setConvert: (option: Convert) => void
  setConversionFormat: (option: ConversionFormat) => void
  loadSettings: () => void
}

export const AudioConversion: FunctionComponent<AudioConversionProps> = ({
  nonStandardAudioFilesConversion,
  convert,
  conversionFormat,
  setNonStandardAudioFilesConversion,
  setConvert,
  setConversionFormat,
  loadSettings,
}) => {
  useEffect(() => {
    loadSettings()
  }, [])
  const changeConvertValue = (event: ChangeEvent<HTMLInputElement>) => {
    setConvert(event.target.value as Convert)
  }
  const changeConversionFormat = (event: ChangeEvent<HTMLInputElement>) => {
    setConversionFormat(event.target.value as ConversionFormat)
  }
  return (
    <AudioConversionUI
      appNonStandardAudioFilesConversion={nonStandardAudioFilesConversion}
      setNonStandardAudioFilesConversion={setNonStandardAudioFilesConversion}
      conversionRadioGroup={conversionRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
      appConvert={convert}
      changeConvertValue={changeConvertValue}
      appConversionFormat={conversionFormat}
      changeConversionFormat={changeConversionFormat}
    />
  )
}

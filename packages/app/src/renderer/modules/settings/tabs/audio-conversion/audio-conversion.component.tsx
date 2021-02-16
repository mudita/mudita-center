/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { ChangeEvent, useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import AudioConversionUI from "Renderer/components/rest/settings/audio-conversion-ui.component"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export const conversionRadioGroup = [
  {
    value: "Always ask",
    label: intl.formatMessage({
      id: "view.name.settings.audioConversion.alwaysAskLabel",
    }),
  },
  {
    value: "Convert automatically",
    label: intl.formatMessage({
      id: "view.name.settings.audioConversion.convertAutomatically",
    }),
  },
]

export const conversionFormatRadioGroup = [
  {
    value: "FLAC",
    label: "FLAC",
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatFlacSubLabel",
    }),
  },
  {
    value: "WAV",
    label: `WAV (${intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatWavLabel",
    })})`,
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatWavSubLabel",
    }),
  },
  {
    value: "MP3",
    label: "MP3",
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatMp3SubLabel",
    }),
  },
]

export interface AudioConversionProps {
  appNonStandardAudioFilesConversion: boolean
  appConvert: Convert
  appConversionFormat: ConversionFormat
  setNonStandardAudioFilesConversion: (option: boolean) => void
  setConvert: (option: Convert) => void
  setConversionFormat: (option: ConversionFormat) => void
  loadSettings: () => void
}

const AudioConversion: FunctionComponent<AudioConversionProps> = ({
  appNonStandardAudioFilesConversion,
  appConvert,
  appConversionFormat,
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
      appNonStandardAudioFilesConversion={appNonStandardAudioFilesConversion}
      setNonStandardAudioFilesConversion={setNonStandardAudioFilesConversion}
      conversionRadioGroup={conversionRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
      appConvert={appConvert}
      changeConvertValue={changeConvertValue}
      appConversionFormat={appConversionFormat}
      changeConversionFormat={changeConversionFormat}
    />
  )
}

export default AudioConversion

import React, { ChangeEvent, useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import AudioConversionUI from "Renderer/components/rest/settings/audio-conversion-ui.component"
import { Convert } from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

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

interface Props {
  appNonStandardAudioFilesConversion: boolean
  appConvert: string
  setNonStandardAudioFilesConversion: (option: boolean) => void
  setConvert: (option: Convert) => void
  loadSettings: () => void
}

const AudioConversion: FunctionComponent<Props> = ({
  appNonStandardAudioFilesConversion,
  appConvert,
  setNonStandardAudioFilesConversion,
  setConvert,
  loadSettings,
}) => {
  useEffect(() => {
    loadSettings()
  }, [])
  const [conversionFormat, setConversionFormat] = useState("WAV")
  const changeConvertValue = (event: ChangeEvent<HTMLInputElement>) => {
    setConvert(event.target.value as Convert)
  }
  const changeConversionFormat = (event: ChangeEvent<HTMLInputElement>) => {
    setConversionFormat(event.target.value)
  }
  return (
    <AudioConversionUI
      appNonStandardAudioFilesConversion={appNonStandardAudioFilesConversion}
      setNonStandardAudioFilesConversion={setNonStandardAudioFilesConversion}
      conversionRadioGroup={conversionRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
      appConvert={appConvert}
      changeConvertValue={changeConvertValue}
      conversionFormat={conversionFormat}
      changeConversionFormat={changeConversionFormat}
    />
  )
}

export default AudioConversion

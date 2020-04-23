import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import AudioConversionUI from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion-ui.component"
import { twoStateToggler } from "Renderer/modules/settings/settings.enum"
import { intl } from "Renderer/utils/intl"

const convertRadioGroup = [
  {
    value: "Always ask",
    id: "id1",
    label: intl.formatMessage({
      id: "view.name.settings.audioConversion.alwaysAskLabel",
    }),
  },
  {
    value: "Convert automatically",
    id: "id2",
    label: intl.formatMessage({
      id: "view.name.settings.audioConversion.convertAutomatically",
    }),
  },
]

const conversionFormatRadioGroup = [
  {
    value: "FLAC",
    id: "id1",
    label: "FLAC",
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatFlacSubLabel",
    }),
  },
  {
    value: "WAV",
    id: "id2",
    label: `WAV (${intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatWavLabel",
    })})`,
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatWavSubLabel",
    }),
  },
  {
    value: "MP3",
    id: "id3",
    label: "MP3",
    subLabel: intl.formatMessage({
      id: "view.name.settings.audioConversion.conversionFormatMp3SubLabel",
    }),
  },
]

const AudioConversion: FunctionComponent = () => {
  const [, setConvert] = useState()
  const [, setConversionFormat] = useState()

  const changeConvertValue = (event: ChangeEvent<HTMLInputElement>) => {
    setConvert(event.target.value)
  }
  const changeConversionFormat = (event: ChangeEvent<HTMLInputElement>) => {
    setConversionFormat(event.target.value)
  }
  return (
    <AudioConversionUI
      convertRadioGroupData={convertRadioGroup}
      conversionFormatRadioGroup={conversionFormatRadioGroup}
      changeConvertValue={changeConvertValue}
      changeConversionFormat={changeConversionFormat}
      togglerState={twoStateToggler}
    />
  )
}

export default AudioConversion

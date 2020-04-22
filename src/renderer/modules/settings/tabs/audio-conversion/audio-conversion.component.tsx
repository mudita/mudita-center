import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import AudioConversionUI from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion-ui.component"
import { ToggleState } from "Renderer/modules/settings/settings.component"
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

const AudioConversion: FunctionComponent = () => {
  const [
    convertNonStandardAudioFiles,
    setConvertNonStandardAudioFiles,
  ] = useState<ToggleState>(ToggleState.Off)
  const [, setConvertRadioGroupValue] = useState()
  const changeConvertRadioGroupValue = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConvertRadioGroupValue({ [event.target.value]: true })
  }
  return (
    <AudioConversionUI
      convertNonStandardAudioFiles={convertNonStandardAudioFiles}
      setConvertNonStandardAudioFiles={setConvertNonStandardAudioFiles}
      convertRadioGroupData={convertRadioGroup}
      onChangeRadioGroup={changeConvertRadioGroupValue}
    />
  )
}

export default AudioConversion

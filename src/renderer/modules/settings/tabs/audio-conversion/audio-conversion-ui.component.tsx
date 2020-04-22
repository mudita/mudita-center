import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { ToggleState } from "Renderer/modules/settings/settings.component"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import styled from "styled-components"
import { InputProps } from "Renderer/interfaces/input.interface"

const ConvertRadioGroup = styled(InputRadioGroup)`
  flex-direction: column;
`

interface Props {
  convertNonStandardAudioFiles?: string
  setConvertNonStandardAudioFiles?: (label: ToggleState) => void
  convertRadioGroupData: InputProps[]
  onChangeRadioGroup: any
}

const AudioConversionUI: FunctionComponent<Props> = ({
  convertRadioGroupData,
  onChangeRadioGroup,
}) => {
  return (
    <div>
      <ConvertRadioGroup
        data={convertRadioGroupData}
        radioGroupName={"name"}
        onChangeRadioGroup={onChangeRadioGroup}
      />
    </div>
  )
}

export default AudioConversionUI

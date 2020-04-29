import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { InputProps } from "Renderer/interfaces/input.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { ActionsWrapper } from "Renderer/components/rest/messages/topics-table.component"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "Renderer/components/rest/settings/settings-ui.component"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import AudioConversionRadioGroup from "Renderer/components/rest/settings/audio-conversion-radio-group.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const ConvertRadioGroup = styled(AudioConversionRadioGroup)`
  margin-left: 4rem;
  margin-top: 3.4rem;
  flex-direction: column;
`

const ConversionFormat = styled.div`
  margin-top: 3rem;
  margin-left: 4rem;
`

const ConversionFormatRadioGroup = styled(AudioConversionRadioGroup)`
  margin-top: 3.4rem;
  flex-direction: column;
`

interface Props {
  nonStandardFilesConversion?: string
  setNonStandardFilesConversion: (label: ToggleState) => void
  convertRadioGroupData: InputProps[]
  conversionFormatRadioGroup: InputProps[]
  changeConvertValue: (event: ChangeEvent<HTMLInputElement>) => void
  changeConversionFormat: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudioConversionUI: FunctionComponent<Props> = ({
  nonStandardFilesConversion,
  setNonStandardFilesConversion,
  convertRadioGroupData,
  conversionFormatRadioGroup,
  changeConvertValue,
  changeConversionFormat,
}) => {
  return (
    <>
      <SettingsWrapper>
        <SettingsDescriptionWrapper>
          <SettingsDescription
            displayStyle={TextDisplayStyle.MediumFadedLightText}
          >
            <FormattedMessage id="view.name.settings.audioConversion.description" />
          </SettingsDescription>
        </SettingsDescriptionWrapper>
        <SettingsTableRow checkMode={false}>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
              <FormattedMessage id="view.name.settings.audioConversion.convertNonStandardFilesLabel" />
            </SettingsLabel>
          </Data>
          <ActionsWrapper>
            <SettingsToggler
              toggleValue={nonStandardFilesConversion}
              onToggle={setNonStandardFilesConversion}
            />
          </ActionsWrapper>
        </SettingsTableRow>
      </SettingsWrapper>
      <ConvertRadioGroup
        onChange={changeConvertValue}
        radioButtonsData={convertRadioGroupData}
        radioGroupName={"convert"}
      />
      <ConversionFormat>
        <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
          <FormattedMessage id="view.name.settings.audioConversion.conversionFormat" />
        </Text>
        <ConversionFormatRadioGroup
          onChange={changeConversionFormat}
          radioButtonsData={conversionFormatRadioGroup}
          radioGroupName={"conversion-format"}
        />
      </ConversionFormat>
    </>
  )
}

export default AudioConversionUI

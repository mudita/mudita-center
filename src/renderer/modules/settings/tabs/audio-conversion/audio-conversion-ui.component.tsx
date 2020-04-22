import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  ToggleState,
  twoStateToggler,
} from "Renderer/modules/settings/settings.component"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import styled from "styled-components"
import { InputProps } from "Renderer/interfaces/input.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { ActionsWrapper } from "Renderer/components/rest/messages/topics-table.component"
import { intl } from "Renderer/utils/intl"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsToggler,
  SettingsTogglerItem,
  SettingsWrapper,
} from "Renderer/modules/settings/settings-ui.component"

const ConvertRadioGroup = styled(InputRadioGroup)`
  margin-left: 4rem;
  margin-top: 3.4rem;
  flex-direction: column;
`

interface Props {
  convertNonStandardAudioFiles?: string
  setConvertNonStandardAudioFiles: (label: ToggleState) => void
  convertRadioGroupData: InputProps[]
  onChangeRadioGroup: any
  togglerState: typeof twoStateToggler
}

const AudioConversionUI: FunctionComponent<Props> = ({
  convertNonStandardAudioFiles,
  setConvertNonStandardAudioFiles,
  convertRadioGroupData,
  onChangeRadioGroup,
  togglerState,
}) => {
  return (
    <div>
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
            <SettingsToggler filled>
              {togglerState.map(label => {
                const changeConvertValue = () =>
                  setConvertNonStandardAudioFiles(label)
                return (
                  <SettingsTogglerItem
                    key={label}
                    label={intl.formatMessage({
                      id: label,
                    })}
                    onClick={changeConvertValue}
                    active={convertNonStandardAudioFiles === label}
                  />
                )
              })}
            </SettingsToggler>
          </ActionsWrapper>
        </SettingsTableRow>
      </SettingsWrapper>
      <ConvertRadioGroup
        data={convertRadioGroupData}
        radioGroupName={"name"}
        onChangeRadioGroup={onChangeRadioGroup}
      />
    </div>
  )
}

export default AudioConversionUI

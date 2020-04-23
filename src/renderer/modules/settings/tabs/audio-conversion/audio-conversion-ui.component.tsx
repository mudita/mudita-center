import React, { ChangeEvent } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { twoStateToggler } from "Renderer/modules/settings/settings.enum"
import InputRadioGroup from "Renderer/components/core/input-radio-group/input-radio-group.component"
import styled from "styled-components"
import { InputProps } from "Renderer/interfaces/input.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
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

const ConvertRadioGroup = styled(InputRadioGroup)`
  margin-left: 4rem;
  margin-top: 3.4rem;
  flex-direction: column;
`

interface Props {
  togglerState: typeof twoStateToggler
  convertRadioGroupData: InputProps[]
  onChangeRadioGroup: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudioConversionUI: FunctionComponent<Props> = ({
  togglerState,
  convertRadioGroupData,
  onChangeRadioGroup,
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
            <SettingsToggler togglerState={togglerState} />
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

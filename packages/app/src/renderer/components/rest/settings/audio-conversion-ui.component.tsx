/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import { noop } from "Renderer/utils/noop"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

const ConvertRadioGroup = styled(AudioConversionRadioGroup)`
  margin-left: 4rem;
  margin-top: 3.4rem;
  flex-direction: column;
`

const ConversionFormatWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 4rem;
`

const ConversionFormatRadioGroup = styled(AudioConversionRadioGroup)`
  margin-top: 3.4rem;
  flex-direction: column;
`

interface Props {
  appNonStandardAudioFilesConversion?: boolean
  setNonStandardAudioFilesConversion?: (option: boolean) => void
  conversionRadioGroup: InputProps[]
  conversionFormatRadioGroup: InputProps[]
  appConvert?: Convert
  changeConvertValue?: (event: ChangeEvent<HTMLInputElement>) => void
  appConversionFormat?: ConversionFormat
  changeConversionFormat?: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudioConversionUI: FunctionComponent<Props> = ({
  appNonStandardAudioFilesConversion,
  setNonStandardAudioFilesConversion = noop,
  conversionRadioGroup,
  conversionFormatRadioGroup,
  appConvert,
  changeConvertValue = noop,
  appConversionFormat,
  changeConversionFormat = noop,
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
              toggleValue={appNonStandardAudioFilesConversion}
              onToggle={setNonStandardAudioFilesConversion}
            />
          </ActionsWrapper>
        </SettingsTableRow>
      </SettingsWrapper>
      <ConvertRadioGroup
        value={appConvert}
        onChange={changeConvertValue}
        radioButtonsData={conversionRadioGroup}
        radioGroupName={"convert"}
      />
      <ConversionFormatWrapper>
        <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
          <FormattedMessage id="view.name.settings.audioConversion.conversionFormat" />
        </Text>
        <ConversionFormatRadioGroup
          value={appConversionFormat}
          onChange={changeConversionFormat}
          radioButtonsData={conversionFormatRadioGroup}
          radioGroupName={"conversion-format"}
        />
      </ConversionFormatWrapper>
    </>
  )
}

export default AudioConversionUI

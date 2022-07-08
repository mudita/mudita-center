/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import { InputProps } from "App/__deprecated__/renderer/interfaces/input.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { ActionsWrapper } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
} from "App/__deprecated__/renderer/modules/settings/components/settings/settings-ui.component"
import SettingsToggler from "App/__deprecated__/renderer/modules/settings/components/settings-toggler/settings-toggler.component"
import AudioConversionRadioGroup from "App/__deprecated__/renderer/modules/settings/components/audio-conversion-radio-group/audio-conversion-radio-group.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import {
  ConversionFormat,
  Convert,
} from "App/__deprecated__/main/store/settings.interface"

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

export const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
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
          <SettingsDescription displayStyle={TextDisplayStyle.Paragraph4}>
            <FormattedMessage id="module.settings.audioConversionDescription" />
          </SettingsDescription>
        </SettingsDescriptionWrapper>
        <SettingsTableRow>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage id="module.settings.audioConversionConvertNonStandardFilesLabel" />
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
        <Text displayStyle={TextDisplayStyle.Paragraph4}>
          <FormattedMessage id="module.settings.audioConversionConversionFormat" />
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

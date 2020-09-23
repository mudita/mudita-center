import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  ButtonWrapper,
  IconHolder,
  StyledButton,
  TetheringImageWrapper,
} from "Renderer/modules/tethering/screens/pure-disconnected.styled"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import Image from "Renderer/components/core/image/image.component"
import TetheringOff from "Renderer/images/tethering/modem-desktop@2x.png"
import { intl, textFormatters } from "Renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { URL_MAIN } from "Renderer/constants/urls"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { tetheringMessages } from "Renderer/modules/tethering/tethering-messages"

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TetheringToggler = styled(SettingsToggler)`
  margin-right: 0;
`

interface TetheringDisabledProps {
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringDisabled: FunctionComponent<TetheringDisabledProps> = ({
  onToggleTethering,
  tetheringEnabled,
}) => (
  <div>
    <TextWrapper>
      <Text
        displayStyle={TextDisplayStyle.MediumText}
        data-testid={TetheringTestIds.DisabledSecondNotification}
      >
        {intl.formatMessage(tetheringMessages.usbTethering, textFormatters)}
      </Text>
      <TetheringToggler
        toggleValue={tetheringEnabled}
        onToggle={onToggleTethering}
      />
    </TextWrapper>
    <ButtonWrapper>
      <Text
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        data-testid={TetheringTestIds.DisabledSecondNotification}
      >
        {intl.formatMessage(tetheringMessages.enablingInfo, textFormatters)}
      </Text>
      <StyledButton
        data-testid={TetheringTestIds.DisabledGotoButton}
        label={intl.formatMessage(tetheringMessages.openConnectionSettings)}
        to={URL_MAIN.settings}
      />
    </ButtonWrapper>
    <Text
      displayStyle={TextDisplayStyle.SmallFadedText}
      data-testid={TetheringTestIds.DisabledThirdNotification}
    >
      <IconHolder>
        <Icon type={Type.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.explanation, textFormatters)}
    </Text>
    <TetheringImageWrapper data-testid={TetheringTestIds.DisabledImage}>
      <Image
        src={TetheringOff}
        alt={intl.formatMessage(tetheringMessages.notConnected)}
        title={intl.formatMessage(tetheringMessages.notConnected)}
      />
    </TetheringImageWrapper>
  </div>
)

export default TetheringDisabled

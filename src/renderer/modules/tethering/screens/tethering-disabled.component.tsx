import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  ButtonWrapper,
  IconHolder,
  InfoText,
  StyledButton,
  TetheringImageWrapper,
} from "Renderer/modules/tethering/screens/tethering.styled"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import Image from "Renderer/components/core/image/image.component"
import TetheringOff from "Renderer/images/tethering/modem-desktop@2x.png"
import { intl, textFormatters } from "Renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { URL_MAIN } from "Renderer/constants/urls"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { tetheringMessages } from "Renderer/modules/tethering/tethering-messages"
import {
  TetheringToggler,
  TextWrapper,
  TetheringContainer,
} from "Renderer/modules/tethering/screens/tethering.styled"

interface TetheringDisabledProps {
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringDisabled: FunctionComponent<TetheringDisabledProps> = ({
  onToggleTethering,
  tetheringEnabled,
}) => (
  <TetheringContainer data-testid={TetheringTestIds.DisabledWrapper}>
    <TextWrapper>
      <Text displayStyle={TextDisplayStyle.MediumText}>
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
        data-testid={TetheringTestIds.StartTetheringNotification}
      >
        {intl.formatMessage(tetheringMessages.enablingInfo, textFormatters)}
      </Text>
      <StyledButton
        data-testid={TetheringTestIds.GoToButton}
        label={intl.formatMessage(tetheringMessages.openConnectionSettings)}
        to={URL_MAIN.settings}
      />
    </ButtonWrapper>
    <InfoText
      displayStyle={TextDisplayStyle.SmallFadedText}
      data-testid={TetheringTestIds.ModemNotification}
    >
      <IconHolder>
        <Icon type={Type.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.explanation, textFormatters)}
    </InfoText>
    <TetheringImageWrapper data-testid={TetheringTestIds.DisabledImage}>
      <Image
        src={TetheringOff}
        alt={intl.formatMessage(tetheringMessages.notConnected)}
        title={intl.formatMessage(tetheringMessages.notConnected)}
      />
    </TetheringImageWrapper>
  </TetheringContainer>
)

export default TetheringDisabled

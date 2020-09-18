import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  ButtonWrapper,
  ErrorIcon,
  IconHolder,
  StyledButton,
  TetheringImageWrapper,
} from "Renderer/modules/tethering/screens/disabled.styled"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Image from "Renderer/components/core/image/image.component"
import NoTethering from "Renderer/images/tethering/tethering-disabled@2x.png"
import React from "react"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"

const messages = defineMessages({
  notConnected: {
    id: "view.name.tethering.tetheringDisabled",
  },
  enablingInfo: {
    id: "view.name.tethering.enablingInfo",
  },
  explanation: {
    id: "view.name.tethering.explanation",
  },
  openConnectionSettings: {
    id: "view.name.tethering.openConnectionSettings",
  },
})

const TetheringDisabled: FunctionComponent = () => (
  <>
    <Text displayStyle={TextDisplayStyle.LargeText}>
      <IconHolder>
        <ErrorIcon />
      </IconHolder>
      {intl.formatMessage(messages.notConnected, textFormatters)}
    </Text>
    <ButtonWrapper>
      <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
        {intl.formatMessage(messages.enablingInfo, textFormatters)}
      </Text>
      <StyledButton
        label={intl.formatMessage(messages.openConnectionSettings)}
        to={URL_MAIN.settings}
      />
    </ButtonWrapper>
    <Text displayStyle={TextDisplayStyle.SmallFadedText}>
      <IconHolder>
        <Icon type={Type.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(messages.explanation, textFormatters)}
    </Text>
    <TetheringImageWrapper>
      <Image
        src={NoTethering}
        alt={intl.formatMessage(messages.notConnected)}
        title={intl.formatMessage(messages.notConnected)}
      />
    </TetheringImageWrapper>
  </>
)

export default TetheringDisabled

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  ButtonWrapper,
  ErrorIcon,
  IconHolder,
  StyledButton,
  TetheringContainer,
  TetheringImageWrapper,
} from "Renderer/modules/tethering/screens/tethering.styled"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Image from "Renderer/components/core/image/image.component"
import NoTethering from "Renderer/images/tethering-disabled.png"
import React from "react"
import { intl, textFormatters } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import { tetheringMessages } from "Renderer/modules/tethering/tethering-messages"

const PureDisconnected: FunctionComponent = () => (
  <TetheringContainer data-testid={TetheringTestIds.DisconnectedWrapper}>
    <Text
      displayStyle={TextDisplayStyle.Paragraph1}
      data-testid={TetheringTestIds.DisconnectedNotificationTitle}
    >
      <IconHolder>
        <ErrorIcon />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.notConnected, textFormatters)}
    </Text>
    <ButtonWrapper>
      <Text
        displayStyle={TextDisplayStyle.Paragraph2}
        data-testid={TetheringTestIds.StartTetheringNotification}
      >
        {intl.formatMessage(tetheringMessages.enablingInfo, textFormatters)}
      </Text>
      <StyledButton
        data-testid={TetheringTestIds.GoToButton}
        labelMessage={tetheringMessages.openConnectionSettings}
        to={URL_MAIN.settings}
      />
    </ButtonWrapper>
    <Text
      displayStyle={TextDisplayStyle.Label}
      color="secondary"
      data-testid={TetheringTestIds.ModemNotification}
    >
      <IconHolder>
        <Icon type={Type.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.explanation, textFormatters)}
    </Text>
    <TetheringImageWrapper data-testid={TetheringTestIds.DisconnectedImage}>
      <Image
        width={"100%"}
        src={NoTethering}
        alt={intl.formatMessage(tetheringMessages.notConnected)}
        title={intl.formatMessage(tetheringMessages.notConnected)}
      />
    </TetheringImageWrapper>
  </TetheringContainer>
)

export default PureDisconnected

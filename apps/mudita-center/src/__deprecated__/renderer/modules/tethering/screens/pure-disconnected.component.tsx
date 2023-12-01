/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  ButtonWrapper,
  ErrorIcon,
  IconHolder,
  StyledButton,
  TetheringContainer,
  TetheringImageWrapper,
} from "App/__deprecated__/renderer/modules/tethering/screens/tethering.styled"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import NoTethering from "App/__deprecated__/renderer/images/tethering-disabled.png"
import React from "react"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import { TetheringTestIds } from "App/__deprecated__/renderer/modules/tethering/screens/tethering.enum"
import { tetheringMessages } from "App/__deprecated__/renderer/modules/tethering/tethering-messages"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
        <Icon type={IconType.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.explanation, textFormatters)}
    </Text>
    <TetheringImageWrapper data-testid={TetheringTestIds.DisconnectedImage}>
      <Image
        width={"100%"}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        src={NoTethering}
        alt={intl.formatMessage(tetheringMessages.notConnected)}
        title={intl.formatMessage(tetheringMessages.notConnected)}
      />
    </TetheringImageWrapper>
  </TetheringContainer>
)

export default PureDisconnected

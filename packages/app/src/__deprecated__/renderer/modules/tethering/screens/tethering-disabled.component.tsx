/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  ButtonWrapper,
  IconHolder,
  InfoText,
  StyledButton,
  TetheringImageWrapper,
} from "App/__deprecated__/renderer/modules/tethering/screens/tethering.styled"
import { TetheringTestIds } from "App/__deprecated__/renderer/modules/tethering/screens/tethering.enum"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import TetheringOff from "App/__deprecated__/renderer/images/modem-desktop.png"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { tetheringMessages } from "App/__deprecated__/renderer/modules/tethering/tethering-messages"
import {
  TetheringToggler,
  TextWrapper,
  TetheringContainer,
} from "App/__deprecated__/renderer/modules/tethering/screens/tethering.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
      <Text displayStyle={TextDisplayStyle.Headline3}>
        {intl.formatMessage(tetheringMessages.usbTethering, textFormatters)}
      </Text>
      <TetheringToggler
        toggleValue={tetheringEnabled}
        onToggle={onToggleTethering}
      />
    </TextWrapper>
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
    <InfoText
      displayStyle={TextDisplayStyle.Label}
      data-testid={TetheringTestIds.ModemNotification}
    >
      <IconHolder>
        <Icon type={IconType.Info} width={1.6} />
      </IconHolder>
      {intl.formatMessage(tetheringMessages.explanation, textFormatters)}
    </InfoText>
    <TetheringImageWrapper data-testid={TetheringTestIds.DisabledImage}>
      <Image
        width={"100%"}
        src={TetheringOff}
        alt={intl.formatMessage(tetheringMessages.notConnected)}
        title={intl.formatMessage(tetheringMessages.notConnected)}
      />
    </TetheringImageWrapper>
  </TetheringContainer>
)

export default TetheringDisabled

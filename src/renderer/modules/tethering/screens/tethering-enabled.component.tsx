/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import {
  StyledButton,
  TetheringToggler,
  TextWrapper,
  TetheringContainer,
  ButtonWrapper,
} from "Renderer/modules/tethering/screens/tethering.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { tetheringMessages } from "Renderer/modules/tethering/tethering-messages"
import { URL_MAIN } from "Renderer/constants/urls"
import StatBoxes from "Renderer/components/rest/tethering/stat-boxes.component"

interface TetheringEnabledProps {
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringEnabled: FunctionComponent<TetheringEnabledProps> = ({
  onToggleTethering,
  tetheringEnabled,
}) => (
  <>
    <TetheringContainer data-testid={TetheringTestIds.EnabledWrapper}>
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
    </TetheringContainer>
    <StatBoxes
      timeActive={"15:03"}
      dataReceived={23943294}
      dataSent={92349324}
    />
  </>
)

export default TetheringEnabled

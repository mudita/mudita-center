/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TetheringTestIds } from "App/__deprecated__/renderer/modules/tethering/screens/tethering.enum"
import {
  StyledButton,
  TetheringToggler,
  TextWrapper,
  TetheringContainer,
  ButtonWrapper,
} from "App/__deprecated__/renderer/modules/tethering/screens/tethering.styled"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { tetheringMessages } from "App/__deprecated__/renderer/modules/tethering/tethering-messages"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import StatBoxes from "App/__deprecated__/renderer/components/rest/tethering/stat-boxes.component"

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
    </TetheringContainer>
    <StatBoxes
      timeActive={"15:03"}
      dataReceived={23943294}
      dataSent={92349324}
    />
  </>
)

export default TetheringEnabled

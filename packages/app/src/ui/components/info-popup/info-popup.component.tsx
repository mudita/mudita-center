/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { InfoPopupTestIds } from "App/ui/components/info-popup/info-popup-test-ids.enum"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"

const InfoPopupWrapper = styled.div`
  position: absolute;
  right: 3.2rem;
  bottom: 3.2rem;
  background-color: ${backgroundColor("modal")};
  padding: 2.4rem;
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: 0.4rem;
  z-index: 2;
`

interface Props {
  message: Message
  testId?: string
}

const InfoPopup: FunctionComponent<Props> = ({ message, testId }) => (
  <InfoPopupWrapper data-testid={testId}>
    <Text
      displayStyle={TextDisplayStyle.Paragraph1}
      data-testid={InfoPopupTestIds.Text}
      message={message}
    />
  </InfoPopupWrapper>
)

export default InfoPopup

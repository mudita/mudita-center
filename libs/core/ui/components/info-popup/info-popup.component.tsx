/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled, { keyframes } from "styled-components"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { InfoPopupTestIds } from "Core/ui/components/info-popup/info-popup-test-ids.enum"
import { Message } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateX(1rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const InfoPopupWrapper = styled.div`
  position: absolute;
  right: 3.2rem;
  bottom: 3.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color: ${backgroundColor("modal")};
  padding: 2.4rem;
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: 0.4rem;
  z-index: 2;

  animation: ${enter} 0.2s ease-in-out;
`

interface Props {
  message: Message
  testId?: string
  icon?: IconType
}

const InfoPopup: FunctionComponent<Props> = ({ message, testId, icon }) => (
  <InfoPopupWrapper data-testid={testId}>
    {icon && <Icon type={icon} size={IconSize.Medium} />}
    <Text
      displayStyle={TextDisplayStyle.Paragraph1}
      data-testid={InfoPopupTestIds.Text}
      message={message}
    />
  </InfoPopupWrapper>
)

export default InfoPopup

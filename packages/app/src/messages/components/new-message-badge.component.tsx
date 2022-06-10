/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "App/__deprecated__/renderer/components/core/button/button.config"
import {
  ButtonWrapper,
  NewMessageWrapper,
  ScrollButton,
  NewMessageContainer,
} from "App/messages/components/new-message-badge.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import { NewMessageBadgeTestIds } from "App/messages/components/new-message-badge-test-ids.enum"

const messages = defineMessages({
  newMessage: { id: "module.messages.newMessageBadge" },
  newMessages: {
    id: "module.messages.newMessagesBadge",
  },
})

interface Props {
  onClose: () => void
  messagesCount: number
  onClick: () => void
}

const NewMessageBadge: FunctionComponent<Props> = ({
  onClose,
  messagesCount,
  onClick,
}) => {
  const getMessageText = (number: number): TranslationMessage => {
    if (number === 1) {
      return {
        ...messages.newMessage,
      }
    } else {
      return {
        ...messages.newMessages,
        values: {
          number: number,
        },
      }
    }
  }
  return (
    <NewMessageContainer>
      <NewMessageWrapper data-testid={NewMessageBadgeTestIds.Wrapper}>
        <ScrollButton onClick={onClick}>
          <Icon type={IconType.ArrowDownWhite} width={1.2} />
          <Text
            data-testid={NewMessageBadgeTestIds.Info}
            displayStyle={TextDisplayStyle.Label}
            message={getMessageText(messagesCount)}
            color="active"
          />
        </ScrollButton>
        <ButtonWrapper>
          <Button
            Icon={IconType.CloseWhite}
            displayStyle={DisplayStyle.InputIcon}
            iconSize={IconSize.Small}
            onClick={onClose}
            size={Size.FixedSmall}
            data-testid={NewMessageBadgeTestIds.Close}
          />
        </ButtonWrapper>
      </NewMessageWrapper>
    </NewMessageContainer>
  )
}

export default NewMessageBadge

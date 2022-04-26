/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import {
  ButtonWrapper,
  NewMessageWrapper,
} from "App/messages/components/new-message-badge.styled"
import { IconType } from "Renderer/components/core/icon/icon-type"
import Icon from "Renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { Message as TranslationMessage } from "Renderer/interfaces/message.interface"
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
}

const NewMessageBadge: FunctionComponent<Props> = ({
  onClose,
  messagesCount,
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
    <NewMessageWrapper>
      <Icon type={IconType.ArrowDownWhite} width={1.2} />
      <Text
        data-testid={NewMessageBadgeTestIds.Info}
        displayStyle={TextDisplayStyle.Label}
        message={getMessageText(messagesCount)}
        color="active"
      />
      <ButtonWrapper>
        <Button
          Icon={IconType.CloseWhite}
          displayStyle={DisplayStyle.InputIcon}
          iconSize={IconSize.Small}
          onClick={onClose}
          size={Size.FixedSmall}
        />
      </ButtonWrapper>
    </NewMessageWrapper>
  )
}

export default NewMessageBadge

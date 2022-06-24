/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import moment from "moment"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  MessageBubbleWrapper,
  MessageBubbleContainer,
  MessageBubbleDropdown,
  ActionsButton,
  WarningIconWrapper,
  Bubble,
  MessageBubbleText,
  MessageDate,
  InitialsAvatar,
} from "App/messages/components/message-bubble/message-bubble.styled"
import { MessageBubbleProps } from "App/messages/components/message-bubble/message-bubble.interface"
import { DropdownPosition } from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble/message-bubble-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { MessageType } from "App/messages/constants"
import { flags, Feature } from "App/feature-flags"

const MessageBubble: FunctionComponent<MessageBubbleProps> = ({
  className,
  id,
  user,
  message,
  date,
  interlocutor = false,
  displayAvatar = false,
  forwardMessage = noop,
  removeMessage = noop,
  resendMessage = noop,
  messageType,
  isMessageBeingDeleted,
}) => {
  const isMessageFailed = messageType === MessageType.FAILED
  const isMessageOutbox = messageType === MessageType.OUTBOX
  const [clicked, setClicked] = useState<string>("")
  const open = () => setClicked(id)
  const close = () => setClicked("")
  const forward = () => forwardMessage(id)
  const remove = () => removeMessage(id)
  const resend = () => resendMessage(id)
  const isDropdownShouldVisible = (): boolean => {
    if (isMessageBeingDeleted) {
      return false
    }

    return (
      flags.get(Feature.MessagesDeleteEnabled) ||
      flags.get(Feature.MessagesForwardEnabled) ||
      flags.get(Feature.MessagesResendEnabled)
    )
  }

  return (
    <MessageBubbleWrapper
      className={className}
      interlocutor={interlocutor}
      displayAvatar={displayAvatar}
    >
      <div>
        <MessageBubbleContainer
          data-testid={MessageBubbleTestIds.Container}
          interlocutor={interlocutor}
        >
          {isDropdownShouldVisible() && (
            <MessageBubbleDropdown
              toggler={
                <ActionsButton
                  data-testid={MessageBubbleTestIds.DropdownActionButton}
                >
                  <Icon type={IconType.More} />
                </ActionsButton>
              }
              onOpen={open}
              onClose={close}
              dropdownPosition={
                interlocutor ? DropdownPosition.Left : DropdownPosition.Right
              }
              interlocutor={interlocutor}
              display={(clicked === id).toString()}
              data-testid={MessageBubbleTestIds.Dropdown}
            >
              {flags.get(Feature.MessagesResendEnabled) &&
                (isMessageFailed || isMessageOutbox) && (
                  <ButtonComponent
                    labelMessage={{
                      id: "module.messages.messageDropdownResend",
                    }}
                    Icon={IconType.Send}
                    onClick={resend}
                    displayStyle={DisplayStyle.Dropdown}
                    data-testid={MessageBubbleTestIds.ResendMessageButton}
                  />
                )}
              {flags.get(Feature.MessagesForwardEnabled) && (
                <ButtonComponent
                  labelMessage={{
                    id: "module.messages.messageDropdownForward",
                  }}
                  Icon={IconType.Forward}
                  onClick={forward}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid={MessageBubbleTestIds.ForwardMessageButton}
                />
              )}
              {flags.get(Feature.MessagesDeleteEnabled) && (
                <ButtonComponent
                  labelMessage={{
                    id: "module.messages.messageDropdownDelete",
                  }}
                  Icon={IconType.Delete}
                  onClick={remove}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid={MessageBubbleTestIds.DeleteMessageButton}
                />
              )}
            </MessageBubbleDropdown>
          )}
          {isMessageFailed && (
            <WarningIconWrapper>
              <Icon
                type={IconType.Warning}
                width={1.6}
                data-testid={MessageBubbleTestIds.NotSendIcon}
              />
            </WarningIconWrapper>
          )}
          <Bubble
            interlocutor={interlocutor}
            isMessageBeingDeleted={isMessageBeingDeleted}
            data-testid={MessageBubbleTestIds.MessageContent}
          >
            <MessageBubbleText displayStyle={TextDisplayStyle.Paragraph4}>
              {message}
            </MessageBubbleText>
            <MessageDate>
              <Text displayStyle={TextDisplayStyle.Label}>
                {moment(date).format("dd h:mm A")}
              </Text>
            </MessageDate>
          </Bubble>
        </MessageBubbleContainer>
      </div>
      {displayAvatar && (
        <InitialsAvatar
          user={user}
          interlocutor={interlocutor}
          size={AvatarSize.Big}
        />
      )}
    </MessageBubbleWrapper>
  )
}

export default MessageBubble

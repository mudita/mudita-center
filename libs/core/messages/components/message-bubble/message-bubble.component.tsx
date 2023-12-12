/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import moment from "moment"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
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
  LoaderWrapper,
} from "Core/messages/components/message-bubble/message-bubble.styled"
import { MessageBubbleProps } from "Core/messages/components/message-bubble/message-bubble.interface"
import { DropdownPosition } from "Core/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { AvatarSize } from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { MessageBubbleTestIds } from "Core/messages/components/message-bubble/message-bubble-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { MessageType } from "Core/messages/constants"
import { flags, Feature } from "Core/feature-flags"
import { SearchResultAccent } from "Core/search/components"
import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"

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
  selected,
  searchQuery,
}) => {
  const isMessageFailed = messageType === MessageType.FAILED
  const messageSending = messageType === MessageType.QUEUED
  const [clicked, setClicked] = useState<string>("")
  const open = () => setClicked(id)
  const close = () => setClicked("")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const forward = () => forwardMessage(id)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const remove = () => removeMessage(id)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const resend = () => resendMessage(id)
  const isDropdownVisible = (): boolean => {
    if (isMessageBeingDeleted) {
      return false
    }
    if (messageSending) {
      return false
    }

    return true
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
          {isDropdownVisible() && (
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
                interlocutor ? DropdownPosition.Right : DropdownPosition.Left
              }
              interlocutor={interlocutor}
              display={clicked === id}
              data-testid={MessageBubbleTestIds.Dropdown}
            >
              {isMessageFailed && (
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
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.messageDropdownDelete",
                }}
                Icon={IconType.Delete}
                onClick={remove}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={MessageBubbleTestIds.DeleteMessageButton}
              />
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
          {messageSending && (
            <LoaderWrapper>
              <Loader
                type={LoaderType.Spinner}
                size={1.4}
                data-testid={MessageBubbleTestIds.Loader}
              />
            </LoaderWrapper>
          )}
          <Bubble
            interlocutor={interlocutor}
            isMessageBeingDeleted={isMessageBeingDeleted}
            data-testid={MessageBubbleTestIds.MessageContent}
          >
            <MessageBubbleText displayStyle={TextDisplayStyle.Paragraph4}>
              {selected ? (
                <SearchResultAccent
                  fullText
                  text={message}
                  query={searchQuery}
                  maxSymbols={message.length}
                />
              ) : (
                message
              )}
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

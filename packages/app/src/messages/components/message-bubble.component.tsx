/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import moment from "moment"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Avatar, {
  User,
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble-test-ids.enum"

const MessageBubbleDropdown = styled(Dropdown)<{
  interlocutor: boolean
  display: string
}>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
  opacity: ${({ display }) => (display === "true" ? "1" : "0")};
`

const MessageBubbleContainer = styled.div<{ interlocutor: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  &:hover {
    ${MessageBubbleDropdown} {
      opacity: 1;
      transition: ${transition("opacity", undefined, "ease")};
    }
  }
  margin-bottom: 0.8rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`

const MessageBubbleWrapper = styled.div<{
  interlocutor: boolean
  displayAvatar: boolean
}>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  justify-content: flex-end;
  margin-left: ${({ displayAvatar, interlocutor }) =>
    displayAvatar && interlocutor ? "0" : "7.5rem"};
  margin-top: ${({ displayAvatar }) => (displayAvatar ? "2.4rem" : "0")};
  margin-right: ${({ displayAvatar, interlocutor }) =>
    displayAvatar && !interlocutor ? "0" : "7.5rem"};
`

const MessageDate = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: -0.5rem;
  right: 0;
  transform: translateY(-100%);
  padding: 0.5rem;
  opacity: 0;
  background-color: ${backgroundColor("row")};
  border-radius: ${borderRadius("medium")};
  box-shadow: 0 0.5rem 1.5rem 0 ${boxShadowColor("full")};
  white-space: nowrap;

  p {
    color: ${textColor("primary")};
  }
`

const Bubble = styled.div<{ interlocutor: boolean }>`
  position: relative;
  padding: 1.1rem 1.2rem;
  margin-top: 0.8rem;
  background-color: ${({ interlocutor }) =>
    interlocutor ? backgroundColor("minor") : backgroundColor("message")};
  border-radius: ${({ interlocutor }) =>
    interlocutor
      ? "1.2rem 1.2rem 1.2rem 0.2rem"
      : "1.2rem 1.2rem 0.2rem 1.2rem"};
  max-width: 38rem;
  box-sizing: border-box;

  &:hover {
    ${MessageDate} {
      opacity: 1;
      transition: ${transition("opacity", undefined, "ease")};
    }
  }
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const InitialsAvatar = styled(Avatar)<{ interlocutor: boolean }>`
  margin-left: ${({ interlocutor }) => (interlocutor ? "0" : "2.7rem")};
  margin-right: ${({ interlocutor }) => (interlocutor ? "2.7rem" : "0")};
  background-color: ${({ interlocutor }) =>
    interlocutor ? backgroundColor("minor") : backgroundColor("message")};
  align-self: end;

  svg g g {
    fill: ${({ interlocutor }) =>
      interlocutor ? textColor("secondary") : textColor("iconUser")};
  }
`

const MessageBubbleText = styled(Text)`
  white-space: pre-line;
`

interface Props {
  id: string
  user: User
  message: string
  date: Date
  interlocutor?: boolean
  displayAvatar?: boolean
  forwardMessage?: () => void
  removeMessage?: () => void
}

const MessageBubble: FunctionComponent<Props> = ({
  className,
  id,
  user,
  message,
  date,
  interlocutor = false,
  displayAvatar = false,
  forwardMessage = noop,
  removeMessage = noop,
}) => {
  const [clicked, setClicked] = useState<string>("")
  const open = () => setClicked(id)
  const close = () => setClicked("")
  const forward = () => forwardMessage(id)
  const remove = () => removeMessage(id)
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
          {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
          {process.env.NODE_ENV !== "production" && (
            <MessageBubbleDropdown
              toggler={
                <ActionsButton
                  data-testid={MessageBubbleTestIds.DropdownActionButton}
                >
                  <Icon type={Type.More} />
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
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.messageDropdownForward",
                }}
                Icon={Type.Forward}
                onClick={forward}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={MessageBubbleTestIds.ForwardMessageButton}
              />
              <ButtonComponent
                labelMessage={{
                  id: "module.messages.messageDropdownDelete",
                }}
                Icon={Type.Delete}
                onClick={remove}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={MessageBubbleTestIds.DeleteMessageButton}
              />
            </MessageBubbleDropdown>
          )}
          <Bubble
            interlocutor={interlocutor}
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

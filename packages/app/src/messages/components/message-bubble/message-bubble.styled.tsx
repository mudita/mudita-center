/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import transition from "App/__deprecated__/renderer/styles/functions/transition"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
export const MessageBubbleDropdown = styled(Dropdown)<{
  interlocutor: boolean
  display: string
}>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
  opacity: ${({ display }) => (display === "true" ? "1" : "0")};
`

export const MessageBubbleContainer = styled.div<{ interlocutor: boolean }>`
  display: flex;
  align-items: center;
  word-wrap: break-word;
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

export const MessageBubbleWrapper = styled.div<{
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

export const MessageDate = styled.div`
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

export const Bubble = styled.div<{
  interlocutor: boolean
  isMessageBeingDeleted: boolean
}>`
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
  opacity: "100%";
  ${({ isMessageBeingDeleted }) => isMessageBeingDeleted && "opacity: 50%;"}
  &:hover {
    ${MessageDate} {
      opacity: 1;
      transition: ${transition("opacity", undefined, "ease")};
    }
  }
`

export const ActionsButton = styled.span`
  cursor: pointer;
`

export const InitialsAvatar = styled(Avatar)<{ interlocutor: boolean }>`
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

export const MessageBubbleText = styled(Text)`
  white-space: pre-line;
`

export const WarningIconWrapper = styled.div`
  margin-right: 1rem;
`

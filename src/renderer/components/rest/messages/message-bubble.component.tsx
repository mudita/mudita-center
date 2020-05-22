import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Avatar, { User } from "Renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const MessageBubbleDropdown = styled(Dropdown)<{
  interlocutor: boolean
  forceOpen: boolean
}>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
  opacity: ${({ forceOpen }) => (forceOpen ? "1" : "0")};
`

const MessageBubbleWrapper = styled.div<{ interlocutor: boolean }>`
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
`

const Bubble = styled.div<{ interlocutor: boolean }>`
  padding: 1.1rem 1.2rem;
  background-color: ${backgroundColor("messageBlue")};
  background-color: ${({ interlocutor }) =>
    interlocutor
      ? backgroundColor("primaryDark")
      : backgroundColor("messageBlue")};
  border-radius: 1.2rem 1.2rem 1.2rem 0.2rem;
  max-width: 38rem;
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const InitialsAvatar = styled(Avatar)<{ interlocutor: boolean }>`
  margin-left: ${({ interlocutor }) => (interlocutor ? "0" : "2.7rem")};
  margin-right: ${({ interlocutor }) => (interlocutor ? "2.7rem" : "0")};
  height: 4.8rem;
  width: 4.8rem;
  background-color: ${({ interlocutor }) =>
    interlocutor
      ? backgroundColor("primaryDark")
      : backgroundColor("messageBlue")};
`

interface Props {
  user: User
  content: string
  interlocutor?: boolean
}

const MessageBubble: FunctionComponent<Props> = ({
  className,
  user,
  content,
  interlocutor = false,
}) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const onOpen = () => setClicked(!clicked)
  const onClose = () => setClicked(false)
  return (
    <MessageBubbleWrapper className={className} interlocutor={interlocutor}>
      <MessageBubbleDropdown
        toggler={
          <ActionsButton>
            <Icon type={Type.More} />
          </ActionsButton>
        }
        onOpen={onOpen}
        onClose={onClose}
        dropdownPosition={
          interlocutor ? DropdownPosition.Left : DropdownPosition.Right
        }
        interlocutor={interlocutor}
        forceOpen={clicked}
      >
        <ButtonComponent
          labelMessage={{
            id: "view.name.messages.messageDropdownForward",
          }}
          Icon={Type.Forward}
          onClick={noop}
          displayStyle={DisplayStyle.Dropdown}
          data-testid="dropdown-contact-details"
        />
        <ButtonComponent
          labelMessage={{
            id: "view.name.messages.messageDropdownDelete",
          }}
          Icon={Type.Delete}
          onClick={noop}
          displayStyle={DisplayStyle.Dropdown}
          data-testid="dropdown-mark-as-read"
        />
      </MessageBubbleDropdown>
      <Bubble interlocutor={interlocutor}>
        <Text displayStyle={TextDisplayStyle.MediumLightText}>{content}</Text>
      </Bubble>
      <InitialsAvatar user={user} interlocutor={interlocutor} />
    </MessageBubbleWrapper>
  )
}

export default MessageBubble

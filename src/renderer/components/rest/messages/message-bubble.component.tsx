import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import Avatar, { User } from "Renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"

const MessageBubbleDropdown = styled(Dropdown)<{ interlocutor: boolean }>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
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

const Bubble = styled.div`
  padding: 1.1rem 1.2rem;
  background-color: ${backgroundColor("messageBlue")};
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
`

interface Props {
  onOpen?: () => void
  onClose?: () => void
  user: User
  dropdownPosition?: DropdownPosition
  content: string
  interlocutor?: boolean
}

const MessageBubble: FunctionComponent<Props> = ({
  className,
  onOpen = noop,
  onClose = noop,
  user,
  dropdownPosition = DropdownPosition.Right,
  content,
  interlocutor = false,
}) => {
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
        dropdownPosition={dropdownPosition}
        interlocutor={interlocutor}
        forceOpen={true}
      />
      <Bubble>
        <Text displayStyle={TextDisplayStyle.MediumLightText}>{content}</Text>
      </Bubble>
      <InitialsAvatar user={user} interlocutor={interlocutor} />
    </MessageBubbleWrapper>
  )
}

export default MessageBubble

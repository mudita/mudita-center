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

const MessageBubbleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const MessageBubbleDropdown = styled(Dropdown)`
  margin-right: 1.1rem;
`

const Bubble = styled.div`
  padding: 1.1rem 1.2rem;
  background-color: ${backgroundColor("messageBlue")};
  border-radius: 1.2rem 1.2rem 1.2rem 0.2rem;
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const InitialsAvatar = styled(Avatar)`
  margin-left: 2.7rem;
  height: 4.8rem;
  width: 4.8rem;
`

interface Props {
  onOpen?: () => void
  onClose?: () => void
  user: User
  dropdownPosition?: DropdownPosition
  content: string
}

const MessageBubble: FunctionComponent<Props> = ({
  onOpen = noop,
  onClose = noop,
  user,
  dropdownPosition = DropdownPosition.Right,
  content,
}) => {
  return (
    <MessageBubbleWrapper>
      <MessageBubbleDropdown
        toggler={
          <ActionsButton>
            <Icon type={Type.More} />
          </ActionsButton>
        }
        onOpen={onOpen}
        onClose={onClose}
        dropdownPosition={dropdownPosition}
      />
      <Bubble>{content}</Bubble>
      <InitialsAvatar user={user} />
    </MessageBubbleWrapper>
  )
}

export default MessageBubble

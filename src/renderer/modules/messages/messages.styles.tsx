import styled, { css } from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Avatar from "Renderer/components/core/avatar/avatar.component"
import {
  DataWrapper,
  Message,
} from "Renderer/components/rest/messages/topics-table.component"
import { lightAvatarStyles } from "Renderer/components/rest/phone/contact-list.component"

export const checkboxVisibleStyles = css`
  display: block;
`

export const MessageRow = styled(Row)`
  height: 9rem;
`

export const Checkbox = styled(InputCheckbox)`
  position: absolute;
  left: 5.4rem;
  display: none;
`

export const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.2rem;
    margin-left: -1.8rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("activity")};
  }
`

export const MessageCol = styled(Col)`
  height: 100%;
`

export const AvatarCol = styled(Col)`
  position: relative;
`

export const InitialsAvatar = styled(Avatar)`
  height: 4.8rem;
  width: 4.8rem;
  position: absolute;
  right: 2.4rem;
`

export const LastMessageText = styled(Message)<{ unread?: boolean }>`
  margin-top: 0.8rem;
  padding-left: ${({ unread }) => (unread ? "1.8rem" : "0")};
  position: relative;
  ${({ unread }) => unread && dotStyles};
`

export const ActionsButton = styled.span`
  cursor: pointer;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

export const Messages = styled(Table)<{
  mouseLock?: boolean
  noneRowsSelected?: boolean
}>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 11.2rem 60.5rem 1fr;
  --columnsTemplateWithOpenedSidebar: 11.2rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${({ noneRowsSelected }) =>
    !noneRowsSelected &&
    css`
      ${InitialsAvatar} {
        display: none;
      }
      ${Checkbox} {
        ${checkboxVisibleStyles};
      }
    `};

  ${Row} {
    :hover {
      ${Checkbox} {
        display: block;
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
      ${InitialsAvatar} {
        display: none;
      }
    }
  }
`

export const MessageDataWrapper = styled(DataWrapper)<{
  sidebarOpened: boolean
}>`
  margin-right: ${({ sidebarOpened }) => (sidebarOpened ? "4rem" : "0")};
`

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import {
  DataWrapper,
  Message,
} from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import ThreadBaseRow from "App/messages/components/thread-base-row.component"
import { lightAvatarStyles } from "App/contacts/components/contact-list/contact-list.component"
import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { Col } from "App/__deprecated__/renderer/components/core/table/table.component"
import { flags, Feature } from "App/feature-flags"

export const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

export const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.8rem;
    margin-left: -1.4rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("activity")};
  }
`

export const ThreadCol = styled(Col)`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const InitialsAvatar = styled(Avatar)`
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

export const LastMessageText = styled(Message)<{ unread?: boolean }>`
  padding-left: ${({ unread }) => (unread ? "1.4rem" : "0")};
  position: relative;
  ${({ unread }) => unread && dotStyles};
`

export const activeRowStyles = css`
  ${InitialsAvatar} {
    ${lightAvatarStyles};
  }
`
export const hoverRowStyles = css`
  :hover {
    background-color: ${backgroundColor("minor")};
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }

    ${InitialsAvatar} {
      ${flags.get(Feature.MessagesThreadDeleteEnabled)
        ? css`
            display: none;
            ${animatedOpacityStyles}
          `
        : lightAvatarStyles}
    }
  }
`

export const ThreadRowContainer = styled(ThreadBaseRow)<{
  notNewConversation: boolean
}>`
  ${({ active }) => active && activeRowStyles};
  ${({ notNewConversation }) => notNewConversation && hoverRowStyles};
`

export const ThreadDataWrapper = styled(DataWrapper)<{
  sidebarOpened: boolean
  isMessageFailed: boolean
}>`
  margin-right: ${({ sidebarOpened, isMessageFailed }) =>
    sidebarOpened && !isMessageFailed ? "4rem" : "0"};
`
export const WarningIconWrapper = styled.div`
  margin-right: 1.7rem;
`

export const NewThreadWrapper = styled.div``

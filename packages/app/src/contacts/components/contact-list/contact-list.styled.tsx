/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Avatar, {
  basicAvatarStyles,
} from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Table, {
  Col,
  Labels,
  Row,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import {
  backgroundColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"
// TODO: Remove file when dropdown buttons become available and change to ButtonComponent where it was used
export const HiddenButton = styled(ButtonComponent)<{ hide: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "flex")};
`

const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

export const InitialsAvatar = styled(Avatar)<{ disabled?: boolean }>`
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.6rem;
  margin-left: 3.2rem;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

export const BlockedIcon = styled(Icon).attrs(() => ({
  type: IconType.Blocked,
}))`
  margin-left: 1.6rem;
`

/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */
export const NameSpan = styled(Text)`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
`

export const ClickableCol = styled(Col)<{ disabled?: boolean }>`
  height: 100%;

  ${NameSpan} {
    color: ${({ disabled }) => (disabled ? textColor("disabled") : "inherit")};
  }

  ${InitialsAvatar} {
    color: ${({ disabled }) => (disabled ? textColor("accent") : "inherit")};
  }
`

export const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8.8rem 1fr 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 8.8rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};
`

const activeRowStyles = css`
  ${InitialsAvatar} {
    ${lightAvatarStyles};
  }
`

export const ContactListRow = styled(Row)`
  ${({ active }) => active && activeRowStyles};
  :hover {
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }
    ${InitialsAvatar} {
      ${animatedOpacityStyles};
      display: none;
    }
  }
`

export const CategoryLabels = styled(Labels)`
  align-items: end;
  background-color: var(--rowBackground) !important;
  grid-template-columns: 1fr;
  > div:first-child {
    margin-bottom: 1.5rem;
    margin-left: 3.2rem;
  }
`

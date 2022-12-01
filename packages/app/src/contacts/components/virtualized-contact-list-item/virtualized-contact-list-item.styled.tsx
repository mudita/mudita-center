/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { lightAvatarStyles } from "App/contacts/components/contact-list/contact-list.styled"
import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import {
  Col,
  Row,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "App/__deprecated__/renderer/components/rest/animated-opacity/animated-opacity"
import { VisibleCheckbox } from "App/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import { textColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

const checkboxShowedStyles = css`
  margin-left: 4.4rem;
  margin-right: 2.8rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

export const InitialsAvatar = styled(Avatar)<{ disabled?: boolean }>`
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

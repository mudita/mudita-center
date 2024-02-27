/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { basicAvatarStyles } from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import ThreadBaseRow from "Core/messages/components/thread-base-row.component"
import { InitialsAvatar } from "Core/messages/components/thread-row.styled"

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

export const SearchResultQueryWrapper = styled.div`
  padding: 0 3.2rem 1.7rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const SearchTitle = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const SearchResultContainer = styled(ThreadBaseRow)`
  :hover {
    ${InitialsAvatar} {
      background-color: ${backgroundColor("row")};
    }
  }
`

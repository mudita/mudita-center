/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Col } from "App/__deprecated__/renderer/components/core/table/table.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"

export const BlockedIcon = styled(Icon).attrs(() => ({
  type: IconType.Blocked,
}))`
  margin-left: 1.6rem;
`

export const ItemCol = styled(Col)`
  height: 100%;
  margin-left: 2rem;
`

export const ClickableCol = styled(ItemCol)`
  cursor: pointer;
`

export const InitialsAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.2rem;
`

export const HoverablePhoneNumber = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;

  &:hover {
    background-color: ${backgroundColor("minor")};
  }
`

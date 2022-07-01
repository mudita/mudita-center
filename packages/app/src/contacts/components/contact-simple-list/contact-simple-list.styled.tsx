/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  Col,
  Labels,
  Group,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"

export const GroupLabel = styled(Labels)`
  background-color: ${backgroundColor("row")};
`
export const BlockedIcon = styled(Icon).attrs(() => ({
  type: IconType.Blocked,
}))`
  margin-left: 1.6rem;
`

export const ClickableCol = styled(Col)`
  height: 100%;
  margin-left: 2rem;
`

export const ContactGroup = styled(Group)`
  --columnsTemplate: 1.5fr 1fr;
  --columnsGap: auto;
  --labelBackground: ${backgroundColor("row")};
`

export const InitialsAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.2rem;
`

export const ListWrapper = styled.div`
  height: 50rem;
  overflow: scroll;
`

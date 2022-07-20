/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import styled from "styled-components"

export const InitialsAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.2rem;
`

export const BlockedIcon = styled(Icon).attrs(() => ({
  type: IconType.Blocked,
}))`
  margin-left: 1.6rem;
`

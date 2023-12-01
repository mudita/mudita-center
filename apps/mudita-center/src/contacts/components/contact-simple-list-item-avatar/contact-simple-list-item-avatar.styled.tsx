/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Avatar from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

export const InitialsAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.2rem;
  flex-shrink: 0;
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

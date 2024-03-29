/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Avatar from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import styled from "styled-components"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"

export const InitialsAvatar = styled(Avatar)`
  width: 4rem;
  height: 4rem;
  margin-right: 1.2rem;
  flex-shrink: 0;
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

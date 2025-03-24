/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { LegacyText } from "app-theme/ui"

export const CommentsLine = styled.div`
  border-top: 0.01rem solid ${({ theme }) => theme.legacy.color.border.verticalSeparator});
  margin-bottom: 2.4rem;
`

export const CommentsText = styled(LegacyText)`
  text-transform: uppercase;
`

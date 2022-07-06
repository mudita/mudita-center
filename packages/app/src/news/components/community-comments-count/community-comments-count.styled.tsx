/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"

export const CommentsLine = styled.div`
  border-top: 0.01rem solid ${borderColor("verticalSeparator")};
  margin-bottom: 2.4rem;
`

export const CommentsText = styled(Text)`
  text-transform: uppercase;
`

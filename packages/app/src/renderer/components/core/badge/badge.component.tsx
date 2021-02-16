/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"

const Badge = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallText,
}))`
  width: 3.2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-left: 1.6rem;
  text-align: center;
  color: ${textColor("primary")};
  background-color: ${backgroundColor("disabled")};
  border-radius: ${borderRadius("medium")};
  word-break: normal;
`

export default Badge

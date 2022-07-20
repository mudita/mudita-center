/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"

const Badge = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Label,
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

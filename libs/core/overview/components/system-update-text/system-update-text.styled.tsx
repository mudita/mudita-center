/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
} from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"

export const AvailableUpdateText = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Label,
  color: "secondary",
}))`
  margin-left: 1.6rem;
  text-transform: none;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};
`

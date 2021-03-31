/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  borderColor,
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"

const Tag = styled(Text).attrs(() => ({
  element: "div",
  displayStyle: TextDisplayStyle.SmallFadedText,
}))`
  max-width: 100%;
  padding: 0.5rem 1.6rem;
  border: 0.1rem solid ${borderColor("separator")};
  border-radius: ${borderRadius("big")};
  color: ${textColor("primary")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`

export default Tag

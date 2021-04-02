/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import {
  borderColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"

const Tag = styled.div`
  max-width: 100%;
  padding: 0.5rem 1.6rem;
  border: 0.1rem solid ${borderColor("separator")};
  border-radius: ${borderRadius("big")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`

export default Tag

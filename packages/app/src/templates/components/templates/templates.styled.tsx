/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

export const TemplatesSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  background-color: ${backgroundColor("main")};
`

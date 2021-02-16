/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("minor")};
`

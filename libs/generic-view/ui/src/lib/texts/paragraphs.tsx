/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { withConfig } from "../utils/with-config"
import styled from "styled-components"

interface Config {
  text: string
}

const Paragraph1: APIFC<undefined, Config> = ({ config, data, ...props }) => {
  return <StyledP1 {...props}>{config?.text}</StyledP1>
}

export const StyledP1 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  color: ${({ theme }) => theme.color.grey2};
  margin: 0;
`

export const Paragraph1WithConfig = withConfig(Paragraph1)

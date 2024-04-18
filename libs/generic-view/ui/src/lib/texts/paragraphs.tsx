/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { ParagraphConfig } from "generic-view/models"
import { isEmpty } from "lodash"

export const Paragraph1: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return <P1 {...props}>{isEmpty(children) ? config.text : children}</P1>
}

export const P1 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  color: ${({ theme }) => theme.color.grey2};
  letter-spacing: 0.02em;
  margin: 0;
`

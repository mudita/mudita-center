/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled, { css } from "styled-components"
import { ParagraphConfig } from "generic-view/models"
import { isEmpty } from "lodash"

const commonStyles = css`
  white-space: pre-wrap;
  margin: 0;
  color: ${({ theme }) => theme.color.grey2};
`

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
  letter-spacing: 0.02em;
  ${commonStyles};
`

export const Paragraph2: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return <P2 {...props}>{isEmpty(children) ? config.text : children}</P2>
}

export const P2 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph2};
  line-height: ${({ theme }) => theme.lineHeight.paragraph2};
  letter-spacing: 0.02em;
  font-weight: 300;
  ${commonStyles};
`

export const Paragraph3: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return <P3 {...props}>{isEmpty(children) ? config.text : children}</P3>
}

export const P3 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.02em;
  ${commonStyles};
`

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled, { css } from "styled-components"
import { ParagraphConfig } from "generic-view/models"
import { isEmpty } from "lodash"
import { Content } from "../data-rows/text-formatted"

type Color = NonNullable<ParagraphConfig>["color"]

const commonStyles = css<{ $color?: Color }>`
  white-space: pre-wrap;
  margin: 0;
  color: ${({ theme, $color = "grey2" }) => theme.generic.color[$color]};
  font-weight: ${({ theme }) => theme.generic.fontWeight.regular};
`

export const Paragraph1: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P1 {...props} $color={config?.color}>
      {isEmpty(children) ? config?.text : children}
    </P1>
  )
}

export const P1 = styled.p<{ $color?: Color }>`
  &,
  ${Content} p {
    font-size: ${({ theme }) => theme.generic.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.generic.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    ${commonStyles};
  }
`

export const Paragraph2: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P2 {...props} $color={config?.color}>
      {isEmpty(children) ? config?.text : children}
    </P2>
  )
}

export const P2 = styled.p<{ $color?: Color }>`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph2};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph2};
  letter-spacing: 0.02em;
  font-weight: ${({ theme }) => theme.generic.fontWeight.light};
  ${commonStyles};
`

export const Paragraph3: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P3 {...props} $color={config?.color}>
      {isEmpty(children) ? config?.text : children}
    </P3>
  )
}

export const P3 = styled.p<{ $color?: Color }>`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph3};
  letter-spacing: 0.02em;
  ${commonStyles};
`

export const Paragraph4: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P4 {...props} $color={config?.color}>
      {isEmpty(children) ? config?.text : children}
    </P4>
  )
}

export const P4 = styled.p<{ $color?: Color }>`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.generic.fontWeight.light};
  letter-spacing: 0.02em;
  ${commonStyles};
`

export const Paragraph5: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P5 {...props} $color={config?.color}>
      {isEmpty(children) ? config?.text : children}
    </P5>
  )
}

export const P5 = styled.p<{ $color?: Color }>`
  ${commonStyles};
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph5};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph5};
  letter-spacing: 0.04em;
`

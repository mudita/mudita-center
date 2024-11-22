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
import { CommonTextProps, commonTextStyles } from "./common-text-styles"

type ParagraphsProps = CommonTextProps

const commonStyles = css<ParagraphsProps>`
  white-space: pre-wrap;
  margin: 0;
  color: ${({ theme, $color = "grey2" }) => theme.color[$color]};
  ${commonTextStyles};
`

export const Paragraph1: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P1
      {...props}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
    >
      {isEmpty(children) ? config?.text : children}
    </P1>
  )
}

export const P1 = styled.p<ParagraphsProps>`
  &,
  ${Content} p {
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    font-weight: ${({ theme }) => theme.fontWeight.regular};

    b,
    strong {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
    ${commonStyles};
  }
`

export const Paragraph2: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P2
      {...props}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
    >
      {isEmpty(children) ? config?.text : children}
    </P2>
  )
}

export const P2 = styled.p<ParagraphsProps>`
  font-size: ${({ theme }) => theme.fontSize.paragraph2};
  line-height: ${({ theme }) => theme.lineHeight.paragraph2};
  letter-spacing: 0.02em;
  font-weight: ${({ theme }) => theme.fontWeight.light};

  b,
  strong {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
  ${commonStyles};
`

export const Paragraph3: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P3
      {...props}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
    >
      {isEmpty(children) ? config?.text : children}
    </P3>
  )
}

export const P3 = styled.p<ParagraphsProps>`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  b,
  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  ${commonStyles};
`

export const Paragraph4: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P4
      {...props}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
    >
      {isEmpty(children) ? config?.text : children}
    </P4>
  )
}

export const P4 = styled.p<ParagraphsProps>`
  font-size: ${({ theme }) => theme.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  letter-spacing: 0.02em;

  b,
  strong {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
  ${commonStyles};
`

export const Paragraph5: APIFC<undefined, ParagraphConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <P5
      {...props}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
    >
      {isEmpty(children) ? config?.text : children}
    </P5>
  )
}

export const P5 = styled.p<ParagraphsProps>`
  ${commonStyles};
  font-size: ${({ theme }) => theme.fontSize.paragraph5};
  line-height: ${({ theme }) => theme.lineHeight.paragraph5};
  letter-spacing: 0.04em;
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  b,
  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`

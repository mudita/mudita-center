/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled, { css } from "styled-components"
import { isEmpty } from "lodash"
import { ParagraphConfig, ParagraphData } from "generic-view/models"
import { Content } from "../data-rows/text-formatted"
import { CommonTextProps, commonTextStyles } from "./common-text-styles"
import { applyTextTransform } from "./apply-text-transform"
import { TypographyTestIds } from "e2e-test-ids"

type ParagraphsProps = CommonTextProps

const commonStyles = css<ParagraphsProps>`
  white-space: pre-wrap;
  margin: 0;
  color: ${({ theme, $color = "grey2" }) => theme.color[$color]};
  ${commonTextStyles};
`

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

export const Paragraph3: APIFC<ParagraphData, ParagraphConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  const text = data?.text ?? config?.text

  const transformedText = applyTextTransform(
    text,
    config?.textTransform,
    config?.textTransformOptions
  )

  return (
    <P3
      data-testid={TypographyTestIds.P3}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
      {...props}
    >
      {isEmpty(children) ? transformedText : children}
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

export const Paragraph4: APIFC<ParagraphData, ParagraphConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  const text = data?.text ?? config?.text

  const transformedText = applyTextTransform(
    text,
    config?.textTransform,
    config?.textTransformOptions
  )

  return (
    <P4
      data-testid={TypographyTestIds.P4}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
      {...props}
    >
      {isEmpty(children) ? transformedText : children}
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
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  ${commonStyles};
`

export const Paragraph5: APIFC<ParagraphData, ParagraphConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  const text = data?.text ?? config?.text

  const transformedText = applyTextTransform(
    text,
    config?.textTransform,
    config?.textTransformOptions
  )

  return (
    <P5
      data-testid={TypographyTestIds.P5}
      $color={config?.color}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
      {...props}
    >
      {isEmpty(children) ? transformedText : children}
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

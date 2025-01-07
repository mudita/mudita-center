/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { isEmpty } from "lodash"
import { APIFC } from "generic-view/utils"
import {
  CommonTextValidators,
  TypographyConfig,
  TypographyData,
  TypographyKey,
  UnboldValidator,
} from "generic-view/models"
import { typographyConfig, TypographyStyle } from "./typography.config"
import { applyTextTransform } from "../texts/apply-text-transform"
import { Content } from "../data-rows/text-formatted"

const BaseTypography: APIFC<TypographyData, TypographyConfig> = ({
  componentName,
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

  const variant = componentName as TypographyKey
  const staticTypographyConfig = typographyConfig[variant]

  return (
    <Wrapper
      styled={styled}
      $color={config?.color ?? staticTypographyConfig.defaultColor}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
      {...staticTypographyConfig}
      {...props}
    >
      {isEmpty(children) ? transformedText : children}
    </Wrapper>
  )
}

interface WrapperStyledProps extends TypographyStyle {
  as?: React.ElementType
  $singleLine?: NonNullable<CommonTextValidators["singleLine"]>
  $textTransform?: NonNullable<CommonTextValidators["textTransform"]>
  $textAlign?: NonNullable<CommonTextValidators["textAlign"]>
  $unbold?: NonNullable<UnboldValidator["unbold"]>
  $color: NonNullable<CommonTextValidators["color"]>
}

const Wrapper = styled.div<WrapperStyledProps>`
  &,
  ${Content} p {
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    color: ${({ theme, $color }) => theme.color[$color]};

    font-size: ${({ fontSize, theme }) => fontSize({ theme })};
    line-height: ${({ fontHeight, theme }) => fontHeight({ theme })};
    font-weight: ${({ fontWeight, theme }) =>
      fontWeight && fontWeight({ theme })};

    b,
    strong {
      font-weight: ${({ strongFontWeight, theme }) =>
        strongFontWeight && strongFontWeight({ theme })};
    }

    ${({ $singleLine }) =>
      $singleLine &&
      css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}

    text-transform: ${({ $textTransform = "unset" }) =>
      $textTransform === "capitalize-first-letter"
        ? "lowercase"
        : $textTransform};

    ${({ $textTransform }) =>
      $textTransform === "capitalize-first-letter" &&
      css`
        &:first-letter {
          text-transform: uppercase;
        }
      `}

    text-align: ${({ $textAlign = "unset" }) => $textAlign};

    ${({ $unbold }) =>
      $unbold &&
      css`
        font-weight: ${({ theme }) => theme.fontWeight.regular};

        b,
        strong {
          font-weight: ${({ theme }) => theme.fontWeight.bold};
        }
      `}
  }
`

const Typography = BaseTypography as typeof BaseTypography & {
  H3: typeof BaseTypography
}

Typography.H3 = (props) => (
  <BaseTypography {...props} componentName="typography.h3" />
)

export default Typography

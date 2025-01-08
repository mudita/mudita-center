/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import {
  CommonTextValidators,
  TypographyConfig,
  TypographyData,
  TypographyKey,
  UnboldValidator,
} from "generic-view/models"
import { Content } from "../data-rows/text-formatted"
import { typographyConfig, TypographyStyle } from "./typography.config"
import { TypographyContent } from "./typography-content"

const BaseTypography: APIFC<TypographyData, TypographyConfig> = (props) => {
  const { componentName, config, ...restProps } = props
  const variant = componentName as TypographyKey
  const staticTypographyConfig = typographyConfig[variant]

  return (
    <TypographyWrapper
      $color={config?.color ?? staticTypographyConfig.defaultColor}
      $textTransform={config?.textTransform}
      $singleLine={config?.singleLine}
      $textAlign={config?.textAlign}
      {...staticTypographyConfig}
      {...restProps}
    >
      <TypographyContent {...props} />
    </TypographyWrapper>
  )
}

interface TypographyWrapperStyledProps extends TypographyStyle {
  as?: React.ElementType
  $singleLine?: NonNullable<CommonTextValidators["singleLine"]>
  $textTransform?: NonNullable<CommonTextValidators["textTransform"]>
  $textAlign?: NonNullable<CommonTextValidators["textAlign"]>
  $unbold?: NonNullable<UnboldValidator["unbold"]>
  $color: NonNullable<CommonTextValidators["color"]>
}

const TypographyWrapper = styled.div<TypographyWrapperStyledProps>`
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
  H4: typeof BaseTypography
  H5: typeof BaseTypography
  P1: typeof BaseTypography
  P2: typeof BaseTypography
  P3: typeof BaseTypography
  P4: typeof BaseTypography
  P5: typeof BaseTypography
}


Typography.H3 = (props) => (
  <BaseTypography {...props} componentName="typography.h3" />
)

Typography.H4 = (props) => (
  <BaseTypography {...props} componentName="typography.h4" />
)

Typography.H5 = (props) => (
  <BaseTypography {...props} componentName="typography.h5" />
)

Typography.P1 = (props) => (
  <BaseTypography {...props} componentName="typography.p1" />
)

Typography.P2 = (props) => (
  <BaseTypography {...props} componentName="typography.p2" />
)

Typography.P3 = (props) => (
  <BaseTypography {...props} componentName="typography.p3" />
)

Typography.P4 = (props) => (
  <BaseTypography {...props} componentName="typography.p4" />
)

Typography.P5 = (props) => (
  <BaseTypography {...props} componentName="typography.p5" />
)

export default Typography

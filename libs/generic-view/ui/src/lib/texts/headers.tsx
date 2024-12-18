/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { isEmpty } from "lodash"
import styled, { css } from "styled-components"
import { TypographyTestIds } from "e2e-test-ids"
import { APIFC } from "generic-view/utils"
import { HeaderConfig, UnboldValidator } from "generic-view/models"
import { CommonTextProps, commonTextStyles } from "./common-text-styles"

interface HeaderProps extends CommonTextProps {
  $unbold?: NonNullable<UnboldValidator["unbold"]>
}

const commonStyle = css<HeaderProps>`
  ${commonTextStyles};
  color: ${({ theme, $color = "black" }) => theme.color[$color]};

  ${({ $unbold }) =>
    $unbold &&
    css`
      font-weight: ${({ theme }) => theme.fontWeight.regular};

      b,
      strong {
        font-weight: ${({ theme }) => theme.fontWeight.bold};
      }
    `}
`

export const Header3: APIFC<undefined, HeaderConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <H3
      data-testid={TypographyTestIds.H3}
      $unbold={config?.unbold}
      $singleLine={config?.singleLine}
      $color={config?.color}
      $textTransform={config?.textTransform}
      {...props}
    >
      {isEmpty(children) ? config?.text : children}
    </H3>
  )
}

export const H3 = styled.h3<HeaderProps>`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
  ${commonStyle};
`

export const Header4: APIFC<undefined, HeaderConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <H4
      data-testid={TypographyTestIds.H4}
      $unbold={config?.unbold}
      $singleLine={config?.singleLine}
      $color={config?.color}
      $textTransform={config?.textTransform}
      {...props}
    >
      {isEmpty(children) ? config?.text : children}
    </H4>
  )
}

export const H4 = styled.h4<HeaderProps>`
  font-size: ${({ theme }) => theme.fontSize.headline4};
  line-height: ${({ theme }) => theme.lineHeight.headline4};
  letter-spacing: 0.02em;
  margin: 0;
  ${commonStyle};
`

export const Header5: APIFC<undefined, HeaderConfig> = ({
  config,
  children,
  ...props
}) => {
  return (
    <H5
      data-testid={TypographyTestIds.H5}
      $unbold={config?.unbold}
      $singleLine={config?.singleLine}
      $color={config?.color}
      $textTransform={config?.textTransform}
      {...props}
    >
      {isEmpty(children) ? config?.text : children}
    </H5>
  )
}

export const H5 = styled.h5<HeaderProps>`
  font-size: ${({ theme }) => theme.fontSize.headline5};
  line-height: ${({ theme }) => theme.lineHeight.headline5};
  letter-spacing: 0.04em;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
  ${commonStyle};
`

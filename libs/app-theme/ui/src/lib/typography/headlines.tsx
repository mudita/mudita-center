/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css, CSSProperties } from "styled-components"
import { TypographyTestId } from "app-theme/models"
import { BaseTypographyProps, baseTypographyStyles } from "./base-typography"

const baseHeadingStyles = css<BaseTypographyProps>`
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  color: ${({ theme }) => theme.app.color.black};
  margin: 0;
  padding: 0;
  ${baseTypographyStyles};
`

const heading1Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline1};
  line-height: ${({ theme }) => theme.app.lineHeight.headline1};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  letter-spacing: -0.02em;
`

export const H1 = styled.h1.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.H1,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${heading1Styles};
`

const heading2Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline2};
  line-height: ${({ theme }) => theme.app.lineHeight.headline2};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
`

export const H2 = styled.h2.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.H2,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${heading2Styles};
`

const heading3Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline3};
  line-height: ${({ theme }) => theme.app.lineHeight.headline3};
`

export const H3 = styled.h3.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.H3,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${heading3Styles};
`

const heading4Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
  line-height: ${({ theme }) => theme.app.lineHeight.headline4};
  letter-spacing: 0.02em;
`

export const H4 = styled.h4.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.H4,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${heading4Styles};
`

const heading5Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline5};
  line-height: ${({ theme }) => theme.app.lineHeight.headline5};
  letter-spacing: 0.04em;
`

export const H5 = styled.h5.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.H5,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${heading5Styles};
`

export const headlinesStyles = {
  h1: heading1Styles,
  h2: heading2Styles,
  h3: heading3Styles,
  h4: heading4Styles,
  h5: heading5Styles,
}

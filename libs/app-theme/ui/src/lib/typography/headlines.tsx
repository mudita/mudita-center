/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { TypographyTestId } from "app-theme/models"
import { baseTypographyStyles, BaseTypographyProps } from "./base-typography"

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

export const H1 = styled.h1.attrs((attrs) => ({
  "data-testid": TypographyTestId.H1,
  ...attrs,
}))`
  ${heading1Styles};
`

const heading2Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline2};
  line-height: ${({ theme }) => theme.app.lineHeight.headline2};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
`

export const H2 = styled.h2.attrs((attrs) => ({
  "data-testid": TypographyTestId.H2,
  ...attrs,
}))`
  ${heading2Styles};
`

const heading3Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline3};
  line-height: ${({ theme }) => theme.app.lineHeight.headline3};
`

export const H3 = styled.h3.attrs((attrs) => ({
  "data-testid": TypographyTestId.H3,
  ...attrs,
}))`
  ${heading3Styles};
`

const heading4Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
  line-height: ${({ theme }) => theme.app.lineHeight.headline4};
  letter-spacing: 0.02em;
`

export const H4 = styled.h4.attrs((attrs) => ({
  "data-testid": TypographyTestId.H4,
  ...attrs,
}))`
  ${heading4Styles};
`

const heading5Styles = css`
  ${baseHeadingStyles};
  font-size: ${({ theme }) => theme.app.fontSize.headline5};
  line-height: ${({ theme }) => theme.app.lineHeight.headline5};
  letter-spacing: 0.04em;
`

export const H5 = styled.h5.attrs((attrs) => ({
  "data-testid": TypographyTestId.H5,
  ...attrs,
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

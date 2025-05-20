/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { TypographyTestId } from "app-theme/models"
import { baseTypographyStyles, BaseTypographyProps } from "./base-typography"

const baseParagraphStyles = css<BaseTypographyProps>`
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  color: ${({ theme }) => theme.app.color.grey2};
  margin: 0;
  padding: 0;

  strong,
  b {
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  }

  ${baseTypographyStyles};
`

const paragraph1Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
  letter-spacing: 0.02em;
`

export const P1 = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.P1,
  ...attrs,
}))`
  ${paragraph1Styles};
`

const paragraph2Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph2};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph2};
  font-weight: ${({ theme }) => theme.app.fontWeight.light};
  letter-spacing: 0.02em;

  strong {
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  }
`

export const P2 = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.P2,
  ...attrs,
}))`
  ${paragraph2Styles};
`

const paragraph3Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  letter-spacing: 0.05em;
`

export const P3 = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.P3,
  ...attrs,
}))`
  ${paragraph3Styles};
`

const paragraph4Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.app.fontWeight.light};
  letter-spacing: 0.02em;
`

export const P4 = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.P4,
  ...attrs,
}))`
  ${paragraph4Styles};
`

const paragraph5Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph5};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph5};
  letter-spacing: 0.04em;
`

export const P5 = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.P5,
  ...attrs,
}))`
  ${paragraph5Styles};
`

const labelStyles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.labelText};
  line-height: ${({ theme }) => theme.app.lineHeight.labelText};
  letter-spacing: 0.04em;
`

export const Label = styled.p.attrs((attrs) => ({
  "data-testid": TypographyTestId.Label,
  ...attrs,
}))`
  ${labelStyles};
`

export const paragraphsStyles = {
  P1: paragraph1Styles,
  P2: paragraph2Styles,
  P3: paragraph3Styles,
  P4: paragraph4Styles,
  P5: paragraph5Styles,
  Label: labelStyles,
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css, CSSProperties } from "styled-components"
import { TypographyTestId } from "app-theme/models"
import { BaseTypographyProps, baseTypographyStyles } from "./base-typography"

const baseListStyles = css<BaseTypographyProps>`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  li {
    list-style-type: none;
    padding: 0.4rem 1.2rem 0.4rem 5rem;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    text-align: inherit;
  }
`

const baseParagraphStyles = css<BaseTypographyProps>`
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  color: ${({ theme }) => theme.app.color.grey2};
  margin: 0;
  padding: 0;

  strong,
  b {
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  }

  ${({ as, forwardedAs }) =>
    (as === "ul" || forwardedAs === "ul") &&
    css`
      ${baseListStyles};

      li {
        position: relative;

        &:before {
          content: "";
          left: 2.1rem;
          top: 0.75em;
          position: absolute;
          width: 0.7rem;
          height: 0.7rem;
          background-color: currentColor;
          border-radius: 50%;
        }
      }
    `};

  ${({ as, forwardedAs }) =>
    (as === "ol" || forwardedAs === "ol") &&
    css`
      ${baseListStyles};

      counter-reset: list-counter;

      li {
        position: relative;
        counter-increment: list-counter;

        &:before {
          content: counter(list-counter) ".";
          position: absolute;
          left: 0.6rem;
          top: 0.4rem;
          color: currentColor;
          text-align: right;
          min-width: 1.6em;
        }
      }
    `};

  ${baseTypographyStyles};
`

const paragraph1Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
  letter-spacing: 0.02em;
`

export const P1 = styled.p.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.P1,
  ...attrs,
  style: style as CSSProperties,
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

export const P2 = styled.p.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.P2,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${paragraph2Styles};
`

const paragraph3Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  letter-spacing: 0.05em;
`

export const P3 = styled.p.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.P3,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${paragraph3Styles};
`

const paragraph4Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.app.fontWeight.light};
  letter-spacing: 0.05em;
`

export const P4 = styled.p.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.P4,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${paragraph4Styles};
`

const paragraph5Styles = css`
  ${baseParagraphStyles};
  font-size: ${({ theme }) => theme.app.fontSize.paragraph5};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph5};
  letter-spacing: 0.04em;
`

export const P5 = styled.p.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.P5,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${paragraph5Styles};
`

const listItemStyles = css`
  ${baseTypographyStyles};
`

export const ListItem = styled.li.attrs(({ style, ...attrs }) => ({
  "data-testid": TypographyTestId.ListItem,
  ...attrs,
  style: style as CSSProperties,
}))`
  ${listItemStyles};
`

export const paragraphsStyles = {
  p1: paragraph1Styles,
  p2: paragraph2Styles,
  p3: paragraph3Styles,
  p4: paragraph4Styles,
  p5: paragraph5Styles,
}

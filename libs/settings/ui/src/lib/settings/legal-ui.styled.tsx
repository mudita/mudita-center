/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { typographyStyles } from "app-theme/ui"

const paragraphStyles = css`
  letter-spacing: 0.03em;
  font-weight: 300;
  color: ${({ theme }) => theme.app.color.black};
  margin-bottom: 1.6rem;
`

export const LegalArticle = styled.article`
  margin: 3.2rem auto;
  width: 100%;
  max-width: 60rem;

  h3 {
    margin-bottom: 4rem;
  }

  p {
    ${paragraphStyles};
  }

  strong {
    font-weight: 400 !important;
  }

  section {
    margin-top: 4rem;

    p {
      &:first-child {
        font-weight: 400;
        margin-bottom: 0;
      }

      span {
        display: block;
      }
    }
  }

  ol,
  ul {
    padding-left: 2.4rem;
    margin: 1rem 0 0;
    list-style-position: inside;

    &:nth-child(n + 3) {
      padding-left: 4.4rem;
    }

    li {
      ${typographyStyles.paragraph.p3};
      ${paragraphStyles};

      > p {
        margin-top: 1em;
        margin-left: 2.4rem;
      }

      li {
        > p {
          margin-left: 4.4rem;
        }
      }
    }
  }

  ol {
    counter-reset: item;

    & > li {
      display: block;
      margin-left: 0;
      counter-increment: item;

      p {
        &:first-of-type {
          display: contents;
        }
      }

      &:before {
        content: counters(item, ".") ". ";
      }
    }

    ol > li {
      display: block;

      &:before {
        content: counters(item, ".") ". ";
      }
    }

    &.lettered {
      counter-reset: letter;

      & > li {
        counter-increment: letter;

        &:before {
          content: counter(letter, lower-alpha) ". ";
        }
      }
    }
  }
`

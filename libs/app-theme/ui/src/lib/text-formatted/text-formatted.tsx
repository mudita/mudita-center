/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import Markdown from "react-markdown"

interface Props {
  text?: string
}

export const TextFormatted: FunctionComponent<Props> = ({ text = "" }) => {
  return (
    <Content>
      <Markdown>{text}</Markdown>
    </Content>
  )
}

export const Content = styled.div`
  & > * {
    text-align: justify !important;
    color: ${({ theme }) => theme.app.color.black} !important;
  }

  h1 {
    font-size: ${({ theme }) => theme.app.fontSize.headline1};
    line-height: ${({ theme }) => theme.app.lineHeight.headline1};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: ${({ theme }) => theme.app.fontSize.headline2};
    line-height: ${({ theme }) => theme.app.lineHeight.headline2};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  }

  h3 {
    font-size: ${({ theme }) => theme.app.fontSize.headline3};
    line-height: ${({ theme }) => theme.app.lineHeight.headline3};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  }

  h4 {
    font-size: ${({ theme }) => theme.app.fontSize.headline4};
    line-height: ${({ theme }) => theme.app.lineHeight.headline4};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    letter-spacing: 0.02em;
  }

  h5 {
    font-size: ${({ theme }) => theme.app.fontSize.headline5};
    line-height: ${({ theme }) => theme.app.lineHeight.headline5};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    letter-spacing: 0.04em;
  }

  h6 {
    font-size: ${({ theme }) => theme.app.fontSize.headline6};
    line-height: ${({ theme }) => theme.app.lineHeight.headline6};
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
    letter-spacing: 0.04em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 0 0;

    &:first-child {
      margin-top: 0;
    }

    + * {
      margin-top: 1.25em !important;
    }
  }

  p,
  ol,
  ul,
  blockquote {
    margin-bottom: 2.4rem;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  p,
  li {
    font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
    line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
    color: ${({ theme }) => theme.app.color.grey1};
    font-weight: ${({ theme }) => theme.app.fontWeight.light};
    letter-spacing: 0.05em;
    margin-top: 0;
    margin-bottom: 0;

    strong {
      font-weight: ${({ theme }) => theme.app.fontWeight.bold};
      color: ${({ theme }) => theme.app.color.black};
    }
  }

  p + p {
    margin-top: 1em;
  }

  ol {
    counter-reset: item;
    li {
      counter-increment: item;
    }
    li:before {
      content: counter(item) ".";
    }
  }
  ul {
    li:before {
      content: "▪";
      font-size: 1rem;
    }
  }
  ol,
  ul {
    list-style: none;
    margin-top: 0;
    padding: 0 0 0 2.2rem;

    li {
      &:before {
        height: 1em;
        width: 2.2rem;
        margin-left: -2.2rem;
        text-align: center;
        display: inline-block;
        vertical-align: top;
      }

      strong {
        font-weight: ${({ theme }) => theme.app.fontWeight.regular};
      }

      ol,
      ul {
        margin-left: 0.8rem;
        margin-bottom: 0;
      }
    }
  }

  a {
    color: ${({ theme }) => theme.app.color.blue2};
    font-weight: ${({ theme }) => theme.app.fontWeight.regular};

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    padding: 0;
    margin: 1rem 0;

    p {
      font-size: ${({ theme }) => theme.app.fontSize.headline5};
      line-height: ${({ theme }) => theme.app.lineHeight.headline5};
      font-weight: ${({ theme }) => theme.app.fontWeight.bold};
      margin-bottom: 0;

      &:first-child {
        &:before {
          content: "“";
        }
      }
      &:last-child {
        &:after {
          content: "”";
        }
      }
    }
  }
`

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withData } from "generic-view/utils"
import Markdown from "react-markdown"

interface Data {
  content: string
}

const TextFormatted: APIFC<Data> = ({ data }) => {
  return <Content>{data?.content}</Content>
}

export default withData(TextFormatted)

const Content = styled(Markdown)`
  color: ${({ theme }) => theme.color.black};

  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline1};
    line-height: ${({ theme }) => theme.lineHeight.headline1};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: -0.02em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSize.headline2};
    line-height: ${({ theme }) => theme.lineHeight.headline2};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSize.headline3};
    line-height: ${({ theme }) => theme.lineHeight.headline3};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h4 {
    font-size: ${({ theme }) => theme.fontSize.headline4};
    line-height: ${({ theme }) => theme.lineHeight.headline4};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.02em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSize.headline5};
    line-height: ${({ theme }) => theme.lineHeight.headline5};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.04em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  p, li {
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    color: ${({ theme }) => theme.color.black};
    letter-spacing: 0.02em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
`

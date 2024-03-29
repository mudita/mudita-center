/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { withData } from "../utils/with-data"

interface Data {
  text: string
}

const TextPlain: APIFC<Data> = ({ data }) => {
  return <Paragraph>{data?.text}</Paragraph>
}

export default withData(TextPlain)

const Paragraph = styled.article`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.07rem;
  white-space: pre-wrap;
`

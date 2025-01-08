/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { Content } from "../data-rows/text-formatted"
import { CommonTextProps, commonTextStyles } from "./common-text-styles"

type ParagraphsProps = CommonTextProps

const commonStyles = css<ParagraphsProps>`
  white-space: pre-wrap;
  margin: 0;
  color: ${({ theme, $color = "grey2" }) => theme.color[$color]};
  ${commonTextStyles};
`

export const P1 = styled.p<ParagraphsProps>`
  &,
  ${Content} p {
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    letter-spacing: 0.02em;
    font-weight: ${({ theme }) => theme.fontWeight.regular};

    b,
    strong {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    ${commonStyles};
  }
`

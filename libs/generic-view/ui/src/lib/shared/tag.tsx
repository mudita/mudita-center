/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"

export const Tag = styled.p`
  display: inline-block;
  padding: 0 ${({ theme }) => theme.space.xs};
  background-color: ${({ theme }) => theme.color.grey5};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.color.grey2};
  font-size: ${({ theme }) => theme.fontSize.tag};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.tag};
  height: ${({ theme }) => theme.lineHeight.tag};
  margin: 0;
`

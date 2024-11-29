/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"

export const Tag = styled.p`
  display: inline-block;
  padding: 0 ${({ theme }) => theme.generic.space.xs};
  background-color: ${({ theme }) => theme.generic.color.grey5};
  border-radius: ${({ theme }) => theme.generic.radius.sm};
  color: ${({ theme }) => theme.generic.color.grey2};
  font-size: ${({ theme }) => theme.generic.fontSize.tag};
  font-weight: ${({ theme }) => theme.generic.fontWeight.regular};
  line-height: ${({ theme }) => theme.generic.lineHeight.tag};
  height: ${({ theme }) => theme.generic.lineHeight.tag};
  margin: 0;
`

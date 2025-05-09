/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { styled, css } from "styled-components"

export const textStyles = css`
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  letter-spacing: 0.05em;
`

export const Input = styled.input`
  position: relative;
  z-index: 2;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  flex: 1;
  color: ${({ theme }) => theme.app.color.black};
  ${textStyles};
`

export const Slot = styled.div``

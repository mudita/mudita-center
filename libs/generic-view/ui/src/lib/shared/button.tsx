/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"

export const DefaultButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`

export const iconButtonStyles = css`
  min-width: 3.2rem;
  min-height: 3.2rem;
  justify-content: center;
`

export const IconButton = styled(DefaultButton)`
  ${iconButtonStyles};
`

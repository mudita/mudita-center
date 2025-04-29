/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"

export const ModalScrollableContent: FunctionComponent<PropsWithChildren> = (
  props
) => {
  return <ScrollableContent {...props} />
}

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--modal-gap);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.app.color.grey2};
  }
`

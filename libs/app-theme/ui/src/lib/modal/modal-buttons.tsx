/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Children, FunctionComponent, PropsWithChildren } from "react"
import styled, { css } from "styled-components"

export const ModalButtons: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const childrenCount = Children.count(children)
  return (
    <ButtonsWrapper $single={childrenCount === 1}>{children}</ButtonsWrapper>
  )
}

export const ButtonsWrapper = styled.div<{
  $single?: boolean
}>`
  display: grid;
  align-self: center;
  align-items: center;
  --min-width: 15.6rem;

  ${({ $single }) =>
    $single
      ? css`
          grid-template-columns: minmax(var(--min-width), 1fr);
          grid-auto-flow: row;
          grid-auto-rows: auto;
          row-gap: 1.4rem;
        `
      : css`
          width: 100%;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          column-gap: 2.4rem;
        `}

  button {
    flex: 1;
    min-height: 3.2rem;
  }
`

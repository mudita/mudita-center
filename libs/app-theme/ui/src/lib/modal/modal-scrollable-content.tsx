/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  PropsWithChildren,
  UIEvent,
  UIEventHandler,
  useCallback,
  useState,
} from "react"
import styled, { css } from "styled-components"

interface Props extends PropsWithChildren {
  fill?: boolean
  onScroll?: (event: UIEvent<HTMLDivElement>) => void
}

export const ModalScrollableContent: FunctionComponent<Props> = ({
  fill,
  ...props
}) => {
  const [contentScrolled, setContentScrolled] = useState(false)

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!fill) {
        return
      }
      const target = event.target as HTMLDivElement
      setContentScrolled(target.scrollTop > 0)
    },
    [fill]
  )

  return (
    <>
      {fill && <ScrollableContentHeader $active={contentScrolled} />}
      <ScrollableContent {...props} $fill={fill} onScroll={handleScroll} />
    </>
  )
}

export const ScrollableContent = styled.div<{
  $fill?: boolean
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--modal-gap);
  overflow-y: auto;

  ${({ $fill }) =>
    $fill &&
    css`
      padding: var(--modal-padding);
      margin: calc(-1 * var(--modal-padding));
      width: calc(100% + var(--modal-padding) * 2 - 0.3rem);
    `};

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

export const ScrollableContentHeader = styled.div<{ $active: boolean }>`
  position: relative;
  width: calc(100% + calc(var(--modal-padding) * 2));
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 8rem;
  margin: calc(var(--modal-padding) * -1);
  transition: box-shadow 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.app.color.white};
  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
    `};
`

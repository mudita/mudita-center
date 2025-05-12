/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { css, styled } from "styled-components"
import { FunctionComponent, ReactNode } from "react"

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
  width: 100%;
  color: ${({ theme }) => theme.app.color.black};
  ${textStyles};
`

export const Slot = styled.div`
  visibility: visible;
  z-index: 2;
`

export const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: inherit;
  gap: inherit;
  margin: 0;
  user-select: none;
  z-index: 1;

  span {
    flex: 1;
    ${textStyles};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${Slot} {
    visibility: hidden;
  }
`

export interface TextInputInnerProps {
  id: string
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  placeholder?: string
}

export const TextInputDefault: FunctionComponent<TextInputInnerProps> = ({
  id,
  leftSlot,
  rightSlot,
  placeholder,
  ...rest
}) => {
  const labelId = `${id}-label`

  return (
    <>
      {leftSlot}
      <Input {...rest} id={id} aria-labelledby={labelId} placeholder={""} />
      {rightSlot}
      <Placeholder>
        {leftSlot}
        <span id={labelId}>{placeholder}</span>
        {rightSlot}
      </Placeholder>
    </>
  )
}

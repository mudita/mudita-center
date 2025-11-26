/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MouseEvent,
  ComponentProps,
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react"
import styled from "styled-components"
import {
  CheckboxSize,
  IconSize,
  IconType,
  TypographyAlign,
} from "app-theme/models"
import { Typography } from "../../typography/typography"
import { TypographyContent } from "../../typography/typography-content/typography-content"
import { Icon } from "../../icon/icon"

interface Props
  extends PropsWithChildren,
    Pick<ComponentProps<typeof InputWrapper>, "style" | "className">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "style" | "className" | "size" | "type" | "placeholder"
    > {
  size?: CheckboxSize
  indeterminate?: boolean
  ref?: Ref<HTMLInputElement>
  ["data-testid"]?: string
}

export const Checkbox: FunctionComponent<Props> = ({
  size = CheckboxSize.Large,
  indeterminate,
  children,
  ref,
  style,
  className,
  id,
  ...rest
}) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node

      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object") {
        ref.current = node
      }
    },
    [ref]
  )

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation()
  }, [])

  useEffect(() => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.indeterminate = indeterminate ?? false
  }, [indeterminate])

  return (
    <InputWrapper
      htmlFor={checkboxId}
      as={id ? "div" : "label"}
      style={style}
      className={className}
      data-testid={rest["data-testid"]}
      onClick={handleClick}
    >
      <CheckboxInput $size={size}>
        <input type="checkbox" id={checkboxId} ref={handleRef} {...rest} />
        <CheckIcon type={IconType.CheckBold} size={IconSize.Tiny} />
        <IndeterminateIcon type={IconType.Minus} size={IconSize.Tiny} />
      </CheckboxInput>
      <TypographyContent as={Typography.P1} textAlign={TypographyAlign.Left}>
        {children}
      </TypographyContent>
    </InputWrapper>
  )
}

const CheckIcon = styled(Icon)``

const IndeterminateIcon = styled(Icon)``

const CheckboxInput = styled.div<{ $size?: CheckboxSize }>`
  position: relative;
  cursor: pointer;
  min-width: ${({ $size }) =>
    $size === CheckboxSize.Small ? "1.6rem" : "2rem"};
  width: ${({ $size }) => ($size === CheckboxSize.Small ? "1.6rem" : "2rem")};
  aspect-ratio: 1;
  border: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.xs};
  background-color: transparent;
  transition-property: border-color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:has(input:checked),
  &:has(input:indeterminate) {
    border-color: ${({ theme }) => theme.app.color.grey1};
    background-color: ${({ theme }) => theme.app.color.grey1};
  }

  &:has(+ p) {
    margin-top: 0.1rem;
  }

  ${CheckIcon}, ${IndeterminateIcon} {
    position: absolute;
    top: 50%;
    left: 50%;
    color: ${({ theme }) => theme.app.color.white};
    opacity: 0;
    transform: translate(-50%, -50%);
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  input {
    display: none;

    &:checked:not(:indeterminate) ~ ${CheckIcon} {
      opacity: 1;
    }

    &:indeterminate ~ ${IndeterminateIcon} {
      opacity: 1;
    }
  }
`

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
  gap: 1.2rem;
  position: relative;
  user-select: none;
  margin: 0;
  padding: 0;

  &:hover {
    ${CheckboxInput} {
      border-color: ${({ theme }) => theme.app.color.grey1};
    }
  }
`

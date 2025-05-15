/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react"
import { css, styled } from "styled-components"
import { TextInputSearchEmptyState } from "./text-input-search-empty-state"

const DROPDOWN_WRAPPER = "dropdown-wrapper"
const DROPDOWN_ITEM_CLASS = "dropdown-item"
const DROPDOWN_ITEM_ACTIVE_CLASS = "active"

type Item = HTMLElement | null

interface Props extends PropsWithChildren {
  inputRef?: RefObject<HTMLInputElement | null>
  ref?: Ref<{
    show: VoidFunction
    hide: VoidFunction
  }>
}

export const TextInputSearchDropdown: FunctionComponent<Props> = ({
  children,
  inputRef,
}) => {
  const innerRef = useRef<HTMLDivElement>(null)

  const clearInput = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.value = ""
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }, [inputRef])

  const getDropdownItems = useCallback(() => {
    const active = innerRef?.current?.querySelector(
      `.${DROPDOWN_ITEM_CLASS}.${DROPDOWN_ITEM_ACTIVE_CLASS}`
    ) as Item
    return {
      active,
      prev: active?.previousElementSibling as Item,
      next: active?.nextElementSibling as Item,
      first: innerRef?.current?.querySelector(
        `.${DROPDOWN_ITEM_CLASS}:first-child`
      ) as Item,
      last: innerRef?.current?.querySelector(
        `.${DROPDOWN_ITEM_CLASS}:last-child`
      ) as Item,
    }
  }, [])

  const switchActiveItem = useCallback(
    (newItem: Item) => {
      const { active } = getDropdownItems()
      if (active && active !== newItem) {
        active.classList.remove(DROPDOWN_ITEM_ACTIVE_CLASS)
      }
      newItem?.classList.add(DROPDOWN_ITEM_ACTIVE_CLASS)
      newItem?.scrollIntoView({ block: "center", behavior: "smooth" })
    },
    [getDropdownItems]
  )

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key
      if (!["Enter", "ArrowDown", "ArrowUp"].includes(key)) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      const { active, first, last, next, prev } = getDropdownItems()

      if (key === "ArrowDown") {
        if (!active) {
          switchActiveItem(first)
          return
        }
        if (!next) {
          switchActiveItem(last)
          return
        }
        switchActiveItem(next)
      }

      if (key === "ArrowUp") {
        if (!active || !prev) {
          switchActiveItem(first)
          return
        }
        switchActiveItem(prev)
      }

      if (key === "Enter") {
        active?.click()
        active?.classList.remove(DROPDOWN_ITEM_ACTIVE_CLASS)
        if (inputRef?.current) {
          clearInput()
          first?.scrollIntoView({ block: "start", behavior: "instant" })
        }
      }
    },
    [clearInput, getDropdownItems, inputRef, switchActiveItem]
  )

  const handleInputChange = useCallback(() => {
    const { active, first } = getDropdownItems()
    active?.classList.remove(DROPDOWN_ITEM_ACTIVE_CLASS)
    first?.scrollIntoView({ block: "start", behavior: "instant" })
  }, [getDropdownItems])

  useEffect(() => {
    const input = inputRef?.current

    input?.addEventListener("keydown", handleInputKeyDown)
    input?.addEventListener("input", handleInputChange)

    return () => {
      input?.removeEventListener("keydown", handleInputKeyDown)
      input?.removeEventListener("input", handleInputChange)
    }
  }, [handleInputChange, handleInputKeyDown, inputRef])

  return (
    <DropdownWrapper ref={innerRef} className={DROPDOWN_WRAPPER}>
      {children}
    </DropdownWrapper>
  )
}

const DropdownItem: FunctionComponent<
  PropsWithChildren & ComponentProps<typeof DropdownItemWrapper>
> = ({ children, className, ref, onClick, onMouseEnter, ...rest }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onClick?.(event)

      // Clear and blur input
      const inputWrapper = (event.target as HTMLElement).closest(
        `.${DROPDOWN_WRAPPER}`
      )?.parentElement
      const input = inputWrapper?.querySelector("input")
      if (input) {
        input.value = ""
        input.dispatchEvent(new Event("input", { bubbles: true }))
        setTimeout(() => {
          input.blur()
        }, 0)
      }
    },
    [onClick]
  )

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onMouseEnter?.(event)

      // Remove active from previous element and add to current
      const activeItem = itemRef.current?.parentElement?.querySelector(
        `.${DROPDOWN_ITEM_CLASS}.${DROPDOWN_ITEM_ACTIVE_CLASS}`
      )
      activeItem?.classList.remove(DROPDOWN_ITEM_ACTIVE_CLASS)
      itemRef.current?.classList.add(DROPDOWN_ITEM_ACTIVE_CLASS)
    },
    [onMouseEnter]
  )

  const combineRefs = useCallback(
    (element: HTMLDivElement) => {
      itemRef.current = element
      if (ref) {
        if (typeof ref === "function") {
          ref(element)
        } else {
          ref.current = element
        }
      }
    },
    [ref]
  )

  return (
    <DropdownItemWrapper
      {...rest}
      className={`${className} ${DROPDOWN_ITEM_CLASS}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      ref={combineRefs}
    >
      {children}
    </DropdownItemWrapper>
  )
}

export const TextInputDropdown: FunctionComponent<
  PropsWithChildren & ComponentProps<typeof DropdownContainer>
> & {
  Item: typeof DropdownItem
  EmptyState: typeof TextInputSearchEmptyState
} = ({ children, ...rest }) => {
  return <DropdownContainer {...rest}>{children}</DropdownContainer>
}
TextInputDropdown.Item = DropdownItem
TextInputDropdown.EmptyState = TextInputSearchEmptyState

const DropdownItemWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.app.color.white};
  outline: none;

  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.app.color.grey5};
  }
`

const DropdownContainer = styled.div`
  border: solid 0.1rem ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.app.color.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const dropdownHidden = css`
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
`

export const dropdownVisible = css`
  opacity: 1;
  visibility: visible;
`

export const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 0;
  left: -3.1rem;
  top: calc(100% + 0.1rem);
  width: calc(100% + 0.2rem);
  box-sizing: content-box;
  padding: 0 3rem 3rem;
  overflow: hidden;
  ${dropdownHidden};
`

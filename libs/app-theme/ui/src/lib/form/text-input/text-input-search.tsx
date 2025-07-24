/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react"
import { IconSize, IconType } from "app-theme/models"
import { styled } from "styled-components"
import {
  Input,
  Placeholder,
  Slot,
  TextInputInnerProps,
} from "./text-input-shared"
import { Icon } from "../../icon/icon"
import {
  dropdownVisible,
  DropdownWrapper,
  TextInputSearchDropdown,
} from "./text-input-search-dropdown"

export { TextInputDropdown } from "./text-input-search-dropdown"

export const TextInputSearch: FunctionComponent<
  TextInputInnerProps & { dropdown?: ReactNode }
> = ({
  id,
  leftSlot: unusedLeftSlot,
  rightSlot: unusedRightSlot,
  placeholder,
  dropdown,
  ref,
  ...rest
}) => {
  const labelId = `${id}-label`
  const inputRef = useRef<HTMLInputElement>(null)

  const combineRefs = useCallback(
    (element: HTMLInputElement) => {
      inputRef.current = element
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

  const clearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }, [])

  const handleClearClick: MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault()
      inputRef.current?.focus()
      clearInput()
    },
    [clearInput]
  )

  const leftSlot = useMemo(() => {
    return (
      <Slot>
        <SearchIcon type={IconType.Search} size={IconSize.Medium} />
      </Slot>
    )
  }, [])

  const rightSlot = useMemo(() => {
    return (
      <ClearSlot onClick={handleClearClick} as="button">
        <Icon type={IconType.Close} size={IconSize.Medium} />
      </ClearSlot>
    )
  }, [handleClearClick])

  return (
    <>
      {leftSlot}
      <SearchInput
        {...rest}
        id={id}
        type={"text"}
        placeholder={""}
        ref={combineRefs}
      />
      {rightSlot}
      {dropdown && (
        <TextInputSearchDropdown inputRef={inputRef}>
          {dropdown}
        </TextInputSearchDropdown>
      )}
      <Placeholder>
        {leftSlot}
        <span id={labelId}>{placeholder}</span>
        {rightSlot}
      </Placeholder>
    </>
  )
}

const SearchIcon = styled(Icon)`
  color: ${({ theme }) => theme.app.color.grey3};
`

const ClearSlot = styled(Slot)`
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:focus {
    & ~ ${DropdownWrapper} {
      ${dropdownVisible};
    }
  }
`

const SearchInput = styled(Input)`
  & + ${Slot} {
    opacity: 1;
  }

  &:placeholder-shown {
    & + ${Slot} {
      opacity: 0;
    }
  }

  &:not(:placeholder-shown):focus-visible {
    & ~ ${DropdownWrapper} {
      ${dropdownVisible};
    }
  }
`

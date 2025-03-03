/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useId,
  useRef,
} from "react"
import { APIFC, IconType, useViewFormContext } from "generic-view/utils"
import styled, { css } from "styled-components"
import { IconButton } from "../../../shared/button"
import { Icon } from "../../../icon/icon"
import { FormSearchInputConfig, FormSearchInputData } from "generic-view/models"
import { SearchResults, SearchResultsWrapper } from "./search-results"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FormTestIds } from "e2e-test-ids"

const messages = defineMessages({
  placeholder: {
    id: "component.searchInput.placeholder",
  },
})

export const SearchInput: APIFC<FormSearchInputData, FormSearchInputConfig> = ({
  data,
  config,
  className,
  style,
  children,
  ...props
}) => {
  const id = useId()
  const getFormContext = useViewFormContext()
  const { register, watch, setValue } = getFormContext(config.formKey)

  const value = (watch(config.name) as string) || ""
  const inputRef = useRef<HTMLInputElement | null>(null)
  const resultsRef = useRef<SearchResults>()
  const { name, label } = config
  const { ref, ...rest } = register(config.name)

  const clear = () => {
    setValue(name, "")
    inputRef.current?.focus()
  }

  const handleRef = (event: HTMLInputElement | null) => {
    ref(event)
    inputRef.current = event
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        resultsRef.current?.scrollToNextItem()
        break
      case "ArrowUp":
        event.preventDefault()
        resultsRef.current?.scrollToPreviousItem()
        break
      case "Enter":
        event.preventDefault()
        resultsRef.current?.activateCurrentItem()
        break
    }
  }

  return (
    <Wrapper style={style} className={className}>
      <InputWrapper>
        <SearchIcon data={{ type: IconType.Search }} />
        <Input
          {...props}
          id={"input-" + id}
          type={"search"}
          placeholder={label || intl.formatMessage(messages.placeholder)}
          {...rest}
          ref={handleRef}
          onKeyDown={handleKeyDown}
          data-testId={FormTestIds.SearchInput}
        />
        {value.length > 0 && (
          <ClearButton
            type={"button"}
            onClick={clear}
            data-testid={"input-clear-button"}
          >
            <ClearIcon data={{ type: IconType.Close }} />
          </ClearButton>
        )}
      </InputWrapper>
      {Children.map(children, (child) => {
        if (
          isValidElement(child) &&
          child.props.componentName === "form.searchInputResults"
        ) {
          return cloneElement(child as ReactElement, {
            componentRef: resultsRef,
          })
        }
        return null
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.color.grey6};

  ${SearchResultsWrapper} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-1rem);
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  &:focus-within {
    ${SearchResultsWrapper} {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`

const SearchIcon = styled(Icon)`
  width: 2.4rem;
  height: 2.4rem;
  align-self: center;
  margin-right: -3.4rem;
  margin-left: 1rem;
`

const ClearIcon = styled(Icon)`
  width: 1.2rem;
  height: 1.2rem;
`

const ClearButton = styled(IconButton)`
  min-width: 2.4rem;
  min-height: 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
  align-self: center;
  margin-left: -3.4rem;
`

const inputFocusStyles = css`
  border-color: ${({ theme }) => theme.color.grey1};
`

const Input = styled.input<{ $withError?: boolean }>`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  padding: 0 3.2rem 0 4.8rem;
  min-height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-sizing: content-box;
  flex: 1;
  outline: none;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.color.grey3};
    font-size: ${({ theme }) => theme.fontSize.paragraph3};
    line-height: ${({ theme }) => theme.lineHeight.paragraph3};
    letter-spacing: 0.05em;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  &:focus {
    ${inputFocusStyles};
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 2;

  &:hover {
    ${Input} {
      ${inputFocusStyles};
    }
  }
`

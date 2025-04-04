/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  KeyboardEvent,
  useDeferredValue,
  useEffect,
  useRef,
} from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { defineMessages } from "react-intl"
import styled, { css } from "styled-components"
import { useFormContext } from "react-hook-form"
import { useHelpSearch } from "help/feature"
import { SearchResults, SearchResultsWrapper } from "./search-results"
import { SearchInput, Typography } from "generic-view/ui"
import { useHistory } from "react-router"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { HelpTestId } from "../test-ids"

const messages = defineMessages({
  title: {
    id: "module.help.search.title",
  },
  description: {
    id: "module.help.search.description",
  },
  placeholder: {
    id: "module.help.search.placeholder",
  },
})

export const Search: FunctionComponent = () => {
  const { watch, register, setValue } = useFormContext<{
    search?: string
    activeResultIndex: number
  }>()
  const history = useHistory()
  const deferredSearchPhrase = useDeferredValue(watch("search") || "")
  const results = useHelpSearch(deferredSearchPhrase)
  const activeResultIndex = watch("activeResultIndex")
  const searchResultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    register("activeResultIndex", { value: 0 })
  }, [register])

  const onArrowNavigation = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
    up?: boolean
  ) => {
    event.preventDefault()
    setValue("activeResultIndex", index)

    const activeElement = searchResultsRef.current?.querySelector(
      `li:has(.active)`
    ) as HTMLElement
    const containerScrollTop = searchResultsRef.current?.scrollTop || 0
    const containerOffsetHeight = searchResultsRef.current?.clientHeight || 0
    const elementTop = activeElement.offsetTop
    const elementHeight = activeElement.offsetHeight
    const elementBottom = elementTop + elementHeight

    if (up) {
      if (elementTop <= containerScrollTop + elementHeight) {
        searchResultsRef.current?.scrollTo(0, elementTop - elementHeight)
      }
    } else {
      if (elementBottom >= containerOffsetHeight + containerScrollTop) {
        searchResultsRef.current?.scrollTo(
          0,
          containerScrollTop + elementHeight
        )
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      onArrowNavigation(
        event,
        Math.min(activeResultIndex + 1, (results?.hits.length || 1) - 1)
      )
    }
    if (event.key === "ArrowUp") {
      onArrowNavigation(event, Math.max(activeResultIndex - 1, 0), true)
    }
    if (event.key === "Enter") {
      const activeResult = results?.hits[activeResultIndex]
      if (activeResult) {
        history.push(
          `${URL_MAIN.help}/${activeResult.document.categoryId}/${activeResult.document.id}`
        )
      }
    }
  }

  const hitsSerialized = JSON.stringify(results?.hits.map((hit) => hit.id))
  useEffect(() => {
    setValue("activeResultIndex", 0)
  }, [hitsSerialized, setValue])

  return (
    <Wrapper>
      <Typography.H3 data-testid={HelpTestId.MainHeader}>
        {intl.formatMessage(messages.title)}
      </Typography.H3>
      <Typography.P3 data-testid={HelpTestId.MainSubheader}>
        {intl.formatMessage(messages.description)}
      </Typography.P3>
      <InputWrapper
        onKeyDown={handleKeyDown}
        dropdownActive={deferredSearchPhrase.length > 1}
        data-testid={HelpTestId.SearchInputWrapper}
      >
        <Input
          config={{
            name: "search",
            label: intl.formatMessage(messages.placeholder),
          }}
          data-testid={HelpTestId.SearchInput}
        />
        <SearchResults
          results={results}
          phrase={deferredSearchPhrase}
          ref={searchResultsRef}
        />
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};
  width: 100%;
  max-width: 52.2rem;
  z-index: 2;
`

const InputWrapper = styled.div<{
  dropdownActive: boolean
}>`
  width: calc(100% - 8.2rem);
  position: relative;

  ${SearchResultsWrapper} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-1rem);
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  ${({ dropdownActive }) =>
    dropdownActive &&
    css`
      &:focus-within {
        ${SearchResultsWrapper} {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }
    `}
`

const Input = styled(SearchInput)`
  background-color: ${({ theme }) => theme.color.white};
  position: relative;
  z-index: 2;
`

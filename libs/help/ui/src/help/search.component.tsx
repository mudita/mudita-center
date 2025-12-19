/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  KeyboardEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useAppNavigate } from "app-routing/utils"
import styled, { css } from "styled-components"
import { defineMessages, useIntl } from "react-intl"
import { useHelpSearch } from "help/utils"
import { HelpCategory, HelpTestId } from "help/models"
import { TextInput } from "app-theme/ui"
import { SearchResults, SearchResultsWrapper } from "./search-results.component"

const messages = defineMessages({
  placeholder: {
    id: "page.help.search.placeholder",
  },
})

interface SearchProps {
  categories: Record<string, HelpCategory>
}

export const Search: FunctionComponent<SearchProps> = ({ categories }) => {
  const [search, setSearch] = useState("")
  const [activeResultIndex, setActiveResultIndex] = useState(0)
  const deferredSearchPhrase = useDeferredValue(search)
  const results = useHelpSearch(deferredSearchPhrase)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const navigate = useAppNavigate()
  const intl = useIntl()

  const hitsIds = useMemo(() => {
    return JSON.stringify(results?.hits.map((hit) => hit.id))
  }, [results?.hits])

  useEffect(() => {
    setActiveResultIndex(0)
  }, [hitsIds])

  const onArrowNavigation = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
    up?: boolean
  ) => {
    event.preventDefault()
    setActiveResultIndex(index)

    const activeElement = searchResultsRef.current?.querySelector(
      `li:has(.active)`
    ) as HTMLElement
    const containerScrollTop = searchResultsRef.current?.scrollTop || 0
    const containerOffsetHeight = searchResultsRef.current?.clientHeight || 0
    const elementTop = activeElement?.offsetTop || 0
    const elementHeight = activeElement?.offsetHeight || 0
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
      event.preventDefault()
      const activeResult = results?.hits[activeResultIndex]
      if (activeResult) {
        navigate(
          `/help/${activeResult.document.categoryId}/${activeResult.document.id}`
        )
      }
    }
  }

  return (
    <Wrapper>
      <InputWrapper
        onKeyDown={handleKeyDown}
        dropdownActive={deferredSearchPhrase.length > 1}
        data-testid={HelpTestId.SearchInputWrapper}
      >
        <TextInput
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={intl.formatMessage(messages.placeholder)}
          data-testid={HelpTestId.SearchInput}
          disableErrors
        />
        {deferredSearchPhrase.length > 1 && (
          <SearchResults
            ref={searchResultsRef}
            results={results}
            phrase={deferredSearchPhrase}
            categories={categories}
            activeResultIndex={activeResultIndex}
            onMouseEnter={(index) => setActiveResultIndex(index)}
          />
        )}
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.2rem 0;
  background-color: ${({ theme }) => theme.app.color.white};
`

const InputWrapper = styled.div<{ dropdownActive: boolean }>`
  width: calc(100% - 8.2rem);
  max-width: 44rem;

  ${SearchResultsWrapper} {
    width: inherit;
    max-width: inherit;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-1rem);
    transition:
      opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out,
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

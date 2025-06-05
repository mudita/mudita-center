/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  FunctionComponent,
} from "react"
import { useNavigate } from "react-router"
import styled, { css } from "styled-components"
import { useIntl, defineMessages } from "react-intl"
import { useHelpSearch } from "help/feature"
import { HelpCategory, HelpTestId } from "help/models"
import { Typography, TextInput } from "app-theme/ui"
import { SearchResults, SearchResultsWrapper } from "./search-results.component"

// import { SearchResults, SearchResultsWrapper } from "../components/search-results"

const messages = defineMessages({
  title: {
    id: "page.help.search.title",
  },
  description: {
    id: "page.help.search.description",
  },
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
  const navigate = useNavigate()
  const intl = useIntl()

  console.log("deferredSearchPhrase", deferredSearchPhrase)
  console.log("Results", results)

  useEffect(() => {
    setActiveResultIndex(0)
  }, [JSON.stringify(results?.hits.map((hit) => hit.id))])

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
        <TextInput
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={intl.formatMessage(messages.placeholder)}
        />
        {deferredSearchPhrase.length > 1 && (
          <SearchResults
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.app.space.xl};
  width: 100%;
  max-width: 52.2rem;
  z-index: 2;
`

const InputWrapper = styled.div<{ dropdownActive: boolean }>`
  width: calc(100% - 8.2rem);
  position: relative;

  ${SearchResultsWrapper} {
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

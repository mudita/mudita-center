/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { KeyboardEvent, useDeferredValue, useEffect } from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { defineMessages } from "react-intl"
import styled, { css } from "styled-components"
import { useFormContext } from "react-hook-form"
import { cleanSearchPhrase, useHelpSearch } from "help/feature"
import { SearchResults, SearchResultsWrapper } from "./search-results"
import { H3, P3, SearchInput } from "generic-view/ui"
import { useHistory } from "react-router"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

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
  const { search: cleanedSearchPhrase, highlight: cleanedHighlightPhrase } =
    cleanSearchPhrase(deferredSearchPhrase)
  const results = useHelpSearch(cleanedSearchPhrase)
  const activeResultIndex = watch("activeResultIndex")

  useEffect(() => {
    register("activeResultIndex", { value: 0 })
  }, [register])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setValue(
        "activeResultIndex",
        Math.min(activeResultIndex + 1, (results?.hits.length || 1) - 1)
      )
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setValue("activeResultIndex", Math.max(activeResultIndex - 1, 0))
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
      <H3>{intl.formatMessage(messages.title)}</H3>
      <P3>{intl.formatMessage(messages.description)}</P3>
      <InputWrapper
        onKeyDown={handleKeyDown}
        dropdownActive={cleanedSearchPhrase.length > 1}
      >
        <Input
          config={{
            name: "search",
            label: intl.formatMessage(messages.placeholder),
          }}
        />
        <SearchResults results={results} phrase={cleanedHighlightPhrase} />
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

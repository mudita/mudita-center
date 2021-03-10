/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SearchableTextTestIds } from "Renderer/components/core/searchable-text/searchable-text-test-ids.enum"

const LightPhrase = styled.span`
  opacity: 0.5;
`

export interface SearchableTextProps {
  text: string
  search?: string
}

const SearchableText: FunctionComponent<SearchableTextProps> = ({ text, search = "" }) => {
  const substrings = text
    .replace(new RegExp(`(${search})`, "gi"), `/$1/`)
    .split("/")

  return (
    <React.Fragment key={text}>
      {search
        ? substrings.map((substring, index) =>
            substring.toLowerCase() === search.toLowerCase() ? (
              <strong data-testid={SearchableTextTestIds.Strong} key={index}>
                {substring}
              </strong>
            ) : (
              <LightPhrase key={index}>{substring}</LightPhrase>
            )
          )
        : text}
    </React.Fragment>
  )
}

export default SearchableText

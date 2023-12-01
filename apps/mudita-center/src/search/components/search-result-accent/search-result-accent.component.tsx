/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { SearchResultAccentProps } from "App/search/components/search-result-accent/search-result-accent.interface"

export const SearchResultAccent: FunctionComponent<SearchResultAccentProps> = ({
  text,
  query,
  fullText,
  maxSymbols = 36,
}) => {
  const wordIndex = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
  const wordLength = query.length
  const freeLength = maxSymbols - wordLength

  const leftOffset = wordIndex - Math.floor(freeLength / 2) - 3
  const rightOffset = wordIndex + wordLength + Math.floor(freeLength / 2) - 3
  const firstPart = text.slice(
    !fullText && leftOffset > 0 ? leftOffset : 0,
    wordIndex
  )
  const secondPart = text.slice(
    wordIndex + wordLength,
    !fullText && rightOffset > 0 && rightOffset <= text.length
      ? rightOffset
      : text.length
  )

  if (wordLength === 0) {
    return <>{text}</>
  }

  if (text.length <= maxSymbols) {
    return (
      <>
        {text.length <= maxSymbols &&
          (wordIndex < 0 ? (
            text
          ) : (
            <>
              {firstPart}
              <strong>{query}</strong>
              {secondPart}
            </>
          ))}
      </>
    )
  }

  return (
    <>
      {wordIndex < 0 ? (
        <>{text.slice(0, maxSymbols)}...</>
      ) : (
        <>
          ...{firstPart}
          <strong>{query}</strong>
          {secondPart}...
        </>
      )}
    </>
  )
}

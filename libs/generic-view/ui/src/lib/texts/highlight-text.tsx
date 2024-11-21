/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ReactElement, useCallback } from "react"
import { APIFC } from "generic-view/utils"
import { HighlightTextConfig, HighlightTextData } from "generic-view/models"

export const HighlightText: APIFC<HighlightTextData, HighlightTextConfig> = ({
  data,
  config,
}) => {
  // TODO: Implement more modes when needed
  const { caseSensitive, mode = "partial", scope = "first" } = config || {}
  const { phrase = "", text = "" } = data || {}

  const processText = useCallback(
    (text: string, phrase: string): ReactElement | null => {
      if (phrase.length === 0) {
        return <>{text}</>
      }
      const matchStartIndex = caseSensitive
        ? text.indexOf(phrase)
        : text.toLowerCase().indexOf(phrase.toLowerCase())
      const matchEndIndex = matchStartIndex + phrase.length
      const beforeMatch = text.slice(0, matchStartIndex)
      const match = text.slice(matchStartIndex, matchEndIndex)
      const afterMatch = text.slice(matchEndIndex)

      if (matchStartIndex === -1) {
        return <>{text}</>
      }

      return (
        <>
          {beforeMatch}
          <strong>{match}</strong>
          {scope === "first" ? afterMatch : processText(afterMatch, phrase)}
        </>
      )
    },
    [caseSensitive, scope]
  )

  return <span key={phrase}>{processText(text, phrase)}</span>
}

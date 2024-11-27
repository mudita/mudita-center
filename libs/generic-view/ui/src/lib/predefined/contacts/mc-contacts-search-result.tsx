/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { difference, isEmpty } from "lodash"
import { APIFC } from "generic-view/utils"
import {
  ContactsSearchResultsConfig,
  ContactsSearchResultsData,
} from "generic-view/models"
import { P3, P4 } from "../../texts/paragraphs"
import { findMatches, HighlightText } from "../../texts/highlight-text"

export const McContactsSearchResult: APIFC<
  ContactsSearchResultsData,
  ContactsSearchResultsConfig
> = ({ data }) => {
  if (!data) {
    return null
  }

  const firstLine = data.firstLine
  const secondLine = difference(
    Array.isArray(data.secondLine) ? data?.secondLine : [data.secondLine],
    [firstLine]
  )
  const renderSecondLine = !isEmpty(secondLine)

  const secondLineMatches = secondLine
    .map((text = "") => {
      const matches = findMatches(
        { text, phrase: data.highlightPhrase },
        { phraseWordsSeparated: true, scope: "all", mode: "anywhere" }
      )
      return {
        matches,
        text,
      }
    })
    .filter(({ matches }) => !isEmpty(matches))[0] || {
    matches: [],
    text: secondLine[0],
  }

  return (
    <>
      <P3 $color={"black"} $singleLine>
        <HighlightText
          data={{
            text: firstLine,
            phrase: data.highlightPhrase,
          }}
          config={{
            mode: "word-start",
            scope: "all",
            phraseWordsSeparated: true,
          }}
        />
      </P3>
      {renderSecondLine && (
        <P4 $color={"black"} $singleLine>
          <HighlightText
            data={{
              text: secondLineMatches.text,
              phrase: data.highlightPhrase,
            }}
            config={{
              matches: secondLineMatches.matches,
            }}
          />
        </P4>
      )}
    </>
  )
}

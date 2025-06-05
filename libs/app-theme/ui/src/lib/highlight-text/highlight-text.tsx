/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, Fragment } from "react"
import { escapeRegExp } from "lodash"

interface HighlightTextProps {
  text: string
  phrase?: string
  caseSensitive?: boolean
  mode?: "anywhere" | "word" | "word-start" | "word-end"
  scope?: "all" | "first" | "last"
  phraseWordsSeparated?: boolean
}

interface Match {
  start: number
  end: number
}

export const HighlightText: FunctionComponent<HighlightTextProps> = ({
  text,
  phrase,
  caseSensitive = false,
  mode = "anywhere",
  scope = "all",
  phraseWordsSeparated = false,
}) => {
  if (!phrase) return <>{text}</>

  const matches = findMatches(
    { text, phrase },
    {
      caseSensitive,
      mode,
      scope,
      phraseWordsSeparated,
    }
  )

  if (!matches?.length) return <>{text}</>

  return (
    <>
      {matches.map(({ start, end }, index) => {
        const previousEnd = matches[index - 1]?.end ?? 0
        const before = text.slice(previousEnd, start)
        const match = text.slice(start, end)
        const after = index === matches.length - 1 ? text.slice(end) : undefined

        return (
          <Fragment key={index}>
            {before}
            <strong>{match}</strong>
            {after}
          </Fragment>
        )
      })}
    </>
  )
}

function findMatches(
  data: { text: string; phrase: string },
  opts: Partial<Omit<HighlightTextProps, "text" | "phrase">>
): Match[] {
  const {
    caseSensitive = false,
    mode = "anywhere",
    scope = "all",
    phraseWordsSeparated = false,
  } = opts

  const phrase = caseSensitive ? data.phrase : data.phrase.toLowerCase()
  const text = caseSensitive ? data.text : data.text.toLowerCase()

  const searchPhrases = (
    phraseWordsSeparated ? phrase.split(" ") : [phrase]
  ).map(escapeRegExp)

  let regexStr: string
  const flags = caseSensitive ? "g" : "gi"
  const wordBoundary = "(?:\\b|\\s)"

  switch (mode) {
    case "word":
      regexStr = `${wordBoundary}(${searchPhrases.join(`|`)})${wordBoundary}`
      break
    case "word-start":
      regexStr = `${wordBoundary}(${searchPhrases.join(`|`)})`
      break
    case "word-end":
      regexStr = `(${searchPhrases.join(`|`)})${wordBoundary}`
      break
    case "anywhere":
    default:
      regexStr = `(${searchPhrases.join("|")})`
  }

  const regex = new RegExp(regexStr, flags)
  const matches: Match[] = []

  for (const match of data.text.matchAll(regex)) {
    const start = match.index ?? 0
    const end = start + match[0].length
    const previous = matches.at(-1)
    if (previous && previous.end >= start) {
      previous.end = Math.max(previous.end, end)
    } else {
      matches.push({ start, end })
    }
  }

  switch (scope) {
    case "first":
      return matches.slice(0, 1)
    case "last":
      return matches.slice(-1)
    default:
      return matches
  }
}

export default HighlightText

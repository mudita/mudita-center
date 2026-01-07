/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, Fragment } from "react"
import { escapeRegExp, last, slice } from "lodash"

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
  if (!phrase) return text

  const matches = findMatches(
    { text, phrase },
    {
      caseSensitive,
      mode,
      scope,
      phraseWordsSeparated,
    }
  )
  const matchCount = matches.length

  if (!matches?.length || matchCount === 0) return text

  return (
    <>
      {matches.map(({ start, end }, index) => {
        const previousMatch = matches[index - 1]
        const nextMatch = matches[index + 1]

        const before = text.slice(previousMatch ? previousMatch.end : 0, start)
        const match = text.slice(start, end)
        const after =
          index === matchCount - 1
            ? text.slice(end, nextMatch ? nextMatch.start : text.length)
            : undefined

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

const findMatches = (
  data: { text: string; phrase: string },
  opts: Partial<Omit<HighlightTextProps, "text" | "phrase">>
): Match[] => {
  const {
    caseSensitive = false,
    mode = "anywhere",
    scope = "all",
    phraseWordsSeparated = false,
  } = opts

  const phrase = caseSensitive ? data.phrase : data.phrase.toLowerCase()
  const text = data.text || ""

  const searchPhrases = (
    phraseWordsSeparated ? phrase.split(" ") : [phrase]
  ).map(escapeRegExp)

  let matchRegex: string
  const flags = caseSensitive ? "gm" : "gmi"
  const wordBoundaryRegex = "(^|\\s+|$)"

  switch (mode) {
    case "word":
      matchRegex = `/${wordBoundaryRegex}${searchPhrases.join(
        `${wordBoundaryRegex}|${wordBoundaryRegex}`
      )}${wordBoundaryRegex}/${flags}`
      break
    case "word-start":
      matchRegex = `/${wordBoundaryRegex}${searchPhrases.join(
        `|${wordBoundaryRegex}`
      )}/${flags}`
      break
    case "word-end":
      matchRegex = `/${searchPhrases.join(
        `${wordBoundaryRegex}|`
      )}${wordBoundaryRegex}/${flags}`
      break
    case "anywhere":
    default:
      matchRegex = `/(${searchPhrases.join("|")})/${flags}`
  }

  const matches = (
    [...text.matchAll(stringToRegex(matchRegex))]
      .map((match) => {
        const text = match[0]
        const start = match.index || 0
        return {
          start,
          end: start + text.length,
        }
      })
      .filter(Boolean) as Match[]
  ).reduce((acc: Match[], match) => {
    const previousMatch = last(acc)
    const previousEnd = previousMatch?.end
    if (
      previousEnd &&
      (previousEnd === match.start ||
        (previousEnd + 1 === match.start && text[previousEnd] === " "))
    ) {
      return [
        ...acc.slice(0, -1),
        {
          start: previousMatch.start,
          end: match.end,
        },
      ]
    }

    return [...acc, match]
  }, [])

  switch (scope) {
    case "first":
      return slice(matches, 0, 1)
    case "last":
      return slice(matches, -1)
    case "all":
    default:
      return matches
  }
}

const stringToRegex = (value?: string) => {
  const main = value?.match(/\/(.+)\/.*/)?.[1]
  const options = value?.match(/\/.+\/(.*)/)?.[1]
  if (!main) {
    throw new Error("Invalid regex")
  }
  return new RegExp(main, options)
}

export default HighlightText

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parse } from "papaparse"
import { isEmpty } from "lodash"
import { ContactRow } from "./parse.types"

export const parseCsv = (csv: string): ContactRow[] => {
  const fixedCsv = fixFormatting(csv)
  const result = parse(fixedCsv, {
    skipEmptyLines: true,
    header: true,
  })
  if (
    result.errors.some((error) => {
      switch (error.code) {
        // These errors are not critical
        case "TooFewFields":
        case "TooManyFields":
          return false
        // These errors are critical
        case "UndetectableDelimiter":
        case "MissingQuotes":
        case "InvalidQuotes":
          return true
      }
    })
  ) {
    console.error(result.errors)
    throw new Error("File could not be parsed")
  }
  if (isEmpty(result.data)) {
    throw new Error("No contacts found")
  }
  return result.data as ContactRow[]
}

const fixFormatting = (value: string) => {
  // Replace new lines in the middle of a field with spaces
  return value.replaceAll(/"(.*?)"/gsu, (match) => {
    return match.replaceAll(/\s/gm, " ")
  })
}

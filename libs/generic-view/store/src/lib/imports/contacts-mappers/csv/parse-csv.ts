/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parse } from "papaparse"
import { isEmpty } from "lodash"
import { UnifiedContact } from "device/models"
import { mapCsv } from "./map-csv"

export const parseCsv = (csv: string): UnifiedContact[] => {
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
    throw new Error("The file is not in the correct format.")
  }
  const contacts = mapCsv(result.data)
  if (isEmpty(contacts)) {
    throw new Error("No contacts found in the file.")
  }
  return contacts
}

const fixFormatting = (value: string) => {
  // Replace new lines in the middle of a field with a space
  return value.replaceAll(/("(.+[^"]*?)")/gmu, (value) => {
    return value.replaceAll(/\s/gm, " ")
  })
}

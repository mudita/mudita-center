/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import stopWords from "../database/stopwords.json"

export const cleanSearchPhrase = (searchPhrase = "") => {
  const cleanedPhrase = searchPhrase
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")

  return {
    search: cleanedPhrase.replace(
      new RegExp(`^(${stopWords.join("|")})(\\s+|$)`, "gm"),
      ""
    ),
    highlight: cleanedPhrase,
  }
}

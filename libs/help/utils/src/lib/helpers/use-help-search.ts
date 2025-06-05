/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { HelpSearchResult } from "help/models"
import { cleanSearchPhrase } from "./clean-search-phrase"
import { helpDatabase } from "../database/help-database"

export const useHelpSearch = (searchPhrase?: string) => {
  const [searchResults, setSearchResults] = useState<HelpSearchResult>()
  const { search: cleanedSearchPhrase } = cleanSearchPhrase(searchPhrase)

  useEffect(() => {
    void (async () => {
      if (cleanedSearchPhrase && cleanedSearchPhrase?.length > 1) {
        const db = await helpDatabase
        const searchResults = await db.search(cleanedSearchPhrase)
        setSearchResults(searchResults)
      } else {
        setSearchResults(undefined)
      }
    })()
  }, [cleanedSearchPhrase])

  return searchResults
}

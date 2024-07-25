/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { HelpSearchResult } from "help/models"
import { helpDatabase } from "./database/help-database"

export const useHelpSearch = (searchPhrase?: string) => {
  const [searchResults, setSearchResults] = useState<HelpSearchResult>()

  useEffect(() => {
    void (async () => {
      if (searchPhrase && searchPhrase?.length > 1) {
        const db = await helpDatabase
        const searchResults = await db.search(searchPhrase)
        setSearchResults(searchResults)
      }
    })()
  }, [searchPhrase])

  return searchResults
}

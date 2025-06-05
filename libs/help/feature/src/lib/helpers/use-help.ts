/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setHelpData } from "../store/help.actions"
import { AppHelp } from "app-utils/renderer"
import { HelpData, HelpSearchResult } from "help/models"
import { cleanSearchPhrase } from "./clean-search-phrase"
import type { AppDispatch } from "app-store/models"

import { helpDatabase } from "../database/help-database"

export const useHelp = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    void (async () => {
      const data = await AppHelp.getData()
      dispatch(setHelpData(data))
    })()
  }, [dispatch])
}

export const useHelpSyncListener = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const listener = (_: unknown, payload: HelpData) => {
      dispatch(setHelpData(payload))
    }

    AppHelp.onDataUpdated(listener)

    return () => {
      AppHelp.removeDataUpdatedListener(listener)
    }
  }, [dispatch])
}

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

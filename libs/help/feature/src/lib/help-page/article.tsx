/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Article } from "help/ui"
import { FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectHelpCategoriesList } from "../store/help.selectors"
import { setHelpData } from "../store/help.actions"

export const ArticlePage: FunctionComponent = () => {
  // only temporary for test
  const dispatch = useDispatch()
  const helpData = useSelector(selectHelpCategoriesList)

  useEffect(() => {
    dispatch(
      setHelpData({
        articles: {},
        assets: {},
        categories: {},
        subcategories: {},
        shortcuts: {},
        nextSyncToken: "abc123",
      })
    )
  }, [dispatch])

  console.log("Redux HelpData:", helpData)

  return <Article />
}

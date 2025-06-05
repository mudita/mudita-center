/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Help } from "help/ui"
import { useSelector } from "react-redux"
import {
  selectHelp,
  selectHelpArticles,
  selectHelpAssets,
  selectHelpCategoriesList,
  selectHelpSubcategories,
} from "../store/help.selectors"
import { useHelp, useHelpSyncListener } from "../helpers/use-help"

export const HelpPage: FunctionComponent = () => {
  // only temporary for test
  useHelp()
  useHelpSyncListener()

  const helpData = useSelector(selectHelp)
  const helpCategoriesList = useSelector(selectHelpCategoriesList)
  const helpSubcategoriesList = useSelector(selectHelpSubcategories)
  const assets = useSelector(selectHelpAssets)
  const articles = useSelector(selectHelpArticles)

  console.log("Redux HelpData:", helpData)

  return (
    <Help
      categories={helpCategoriesList}
      assets={assets}
      subcategories={helpSubcategoriesList}
      articles={articles}
    />
  )
}

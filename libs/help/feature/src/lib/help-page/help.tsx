/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Help } from "help/ui"
import { useSelector } from "react-redux"
import { useAppDispatch } from "app-store/utils"
import { setCreateTicketModalVisible } from "contact-support/feature"
import {
  selectHelp,
  selectHelpArticles,
  selectHelpAssets,
  selectHelpCategories,
  selectHelpCategoriesList,
  selectHelpSubcategories,
} from "../store/help.selectors"
import { useHelp, useHelpSyncListener } from "../helpers/use-help"

export const HelpPage: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  // only temporary for test
  useHelp()
  useHelpSyncListener()

  const helpData = useSelector(selectHelp)
  const helpCategoriesList = useSelector(selectHelpCategoriesList)
  const helpSubcategoriesList = useSelector(selectHelpSubcategories)
  const assets = useSelector(selectHelpAssets)
  const articles = useSelector(selectHelpArticles)
  const categories = useSelector(selectHelpCategories)

  console.log("Redux HelpData:", helpData)

  const handleContactSupport = () => {
    dispatch(setCreateTicketModalVisible(true))
  }

  return (
    <Help
      categoriesList={helpCategoriesList}
      categories={categories}
      assets={assets}
      subcategories={helpSubcategoriesList}
      articles={articles}
      onContactSupport={handleContactSupport}
    />
  )
}

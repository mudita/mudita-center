/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { useAppDispatch } from "app-store/utils"
import { setContactSupportModalVisible } from "contact-support/feature"
import { Help } from "help/ui"
import { helpPaths } from "help/models"
import { useAppNavigate } from "app-routing/utils"
import {
  selectHelpArticles,
  selectHelpAssets,
  selectHelpCategories,
  selectHelpCategoriesList,
  selectHelpSubcategories,
} from "../store/help.selectors"

export const HelpPage: FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const helpCategoriesList = useSelector(selectHelpCategoriesList)
  const helpSubcategoriesList = useSelector(selectHelpSubcategories)
  const assets = useSelector(selectHelpAssets)
  const articles = useSelector(selectHelpArticles)
  const categories = useSelector(selectHelpCategories)

  const { categoryId } = useParams<{
    categoryId?: string
  }>()
  const navigate = useAppNavigate()
  const categoriesList = useSelector(selectHelpCategoriesList)

  useEffect(() => {
    if (!categoryId && categoriesList && categoriesList.length > 0) {
      navigate(`${helpPaths.index}/${categoriesList[0].id}`)
    }
  }, [categoriesList, categoryId, navigate])

  const handleContactSupport = () => {
    dispatch(setContactSupportModalVisible(true))
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

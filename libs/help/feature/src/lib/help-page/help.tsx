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
import { HelpPaths } from "help/models"
import { useAppNavigate } from "app-routing/utils"
import {
  selectHelpArticles,
  selectHelpAssets,
  selectHelpCategories,
  selectHelpCategoriesList,
  selectHelpSubcategories,
} from "../store/help.selectors"

export const HelpPage: FunctionComponent = () => {
  const { categoryId } = useParams<{
    categoryId?: string
  }>()

  const dispatch = useAppDispatch()
  const navigate = useAppNavigate()

  const categoriesList = useSelector(selectHelpCategoriesList)
  const subcategoriesList = useSelector(selectHelpSubcategories)
  const assets = useSelector(selectHelpAssets)
  const articles = useSelector(selectHelpArticles)
  const categories = useSelector(selectHelpCategories)

  useEffect(() => {
    if (!categoryId && categoriesList && categoriesList.length > 0) {
      navigate(`${HelpPaths.Index}/${categoriesList[0].id}`)
    }
  }, [categoriesList, categoryId, navigate])

  const handleContactSupport = () => {
    dispatch(setContactSupportModalVisible(true))
  }

  return (
    <Help
      categoriesList={categoriesList}
      categories={categories}
      assets={assets}
      subcategories={subcategoriesList}
      articles={articles}
      onContactSupport={handleContactSupport}
    />
  )
}

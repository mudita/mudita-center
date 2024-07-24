/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectHelpCategories = createSelector(
  (state: ReduxRootState) => state.help.data.categories,
  (categories) => categories
)

export const selectHelpCategoriesList = createSelector(
  selectHelpCategories,
  (categories) => {
    return Object.values(categories).sort((a, b) => a.order - b.order)
  }
)

export const selectCurrentCategory = createSelector(
  (state: ReduxRootState) => state.help.data.categories,
  (state: ReduxRootState, categoryId?: string) => categoryId,
  (categories, categoryId) => {
    return categoryId ? categories[categoryId] : undefined
  }
)

export const selectCurrentSubcategory = createSelector(
  (state: ReduxRootState) => state.help.data.subcategories,
  (state: ReduxRootState, subcategoryId?: string) => subcategoryId,
  (subcategories, subcategoryId) => {
    return subcategoryId ? subcategories[subcategoryId] : undefined
  }
)

export const selectHelpArticles = createSelector(
  (state: ReduxRootState) => state.help.data.articles,
  (articles) => {
    return articles
  }
)

export const selectCurrentArticle = createSelector(
  selectHelpArticles,
  (state: ReduxRootState, articleId?: string) => articleId,
  (articles, articleId) => {
    return articleId ? articles[articleId] : undefined
  }
)

export const selectHelpAssets = createSelector(
  (state: ReduxRootState) => state.help.data.assets,
  (assets) => {
    return assets
  }
)

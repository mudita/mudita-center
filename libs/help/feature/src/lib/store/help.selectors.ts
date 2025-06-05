/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"

export const selectHelp = (state: AppState) => state.help.data

export const selectHelpCategoriesList = createSelector(selectHelp, (help) =>
  Object.values(help.categories).sort((a, b) => a.order - b.order)
)

export const selectCurrentCategory = createSelector(
  (state: AppState) => state.help.data.categories,
  (_: AppState, categoryId?: string) => categoryId,
  (categories, categoryId) => (categoryId ? categories[categoryId] : undefined)
)

export const selectHelpSubcategories = createSelector(
  selectHelp,
  (help) => help.subcategories
)

export const selectCurrentSubcategory = createSelector(
  (state: AppState) => state.help.data.subcategories,
  (_: AppState, subcategoryId?: string) => subcategoryId,
  (subcategories, subcategoryId) =>
    subcategoryId ? subcategories[subcategoryId] : undefined
)

export const selectHelpArticles = createSelector(
  selectHelp,
  (help) => help.articles
)

export const selectCurrentArticle = createSelector(
  selectHelpArticles,
  (_: AppState, articleId?: string) => articleId,
  (articles, articleId) => (articleId ? articles[articleId] : undefined)
)

export const selectHelpAssets = createSelector(
  (state: AppState) => state.help.data.assets,
  (assets) => assets
)

export const selectRatedArticles = createSelector(
  (state: AppState) => state.help.ratedArticles,
  (ratedArticles) => ratedArticles
)

export const selectArticleRateStatus = createSelector(
  (state: AppState) => state.help.ratedArticles,
  (_: AppState, articleId: string) => articleId,
  (ratedArticles, articleId) => ratedArticles.includes(articleId)
)

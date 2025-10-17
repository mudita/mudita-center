/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppStore } from "app-store/models"

export const selectHelp = createSelector(
  (state: AppStore) => state.help.data,
  (help) => help
)

export const selectHelpCategories = createSelector(
  (state: AppStore) => state.help.data.categories,
  (categories) => categories
)

export const selectHelpCategoriesList = createSelector(selectHelp, (help) =>
  Object.values(help.categories).sort((a, b) => a.order - b.order)
)

export const selectCurrentCategory = createSelector(
  (state: AppStore) => state.help.data.categories,
  (_: AppStore, categoryId?: string) => categoryId,
  (categories, categoryId) => (categoryId ? categories[categoryId] : undefined)
)

export const selectHelpSubcategories = createSelector(
  selectHelp,
  (help) => help.subcategories
)

export const selectCurrentSubcategory = createSelector(
  (state: AppStore) => state.help.data.subcategories,
  (_: AppStore, subcategoryId?: string) => subcategoryId,
  (subcategories, subcategoryId) =>
    subcategoryId ? subcategories[subcategoryId] : undefined
)

export const selectHelpArticles = createSelector(
  selectHelp,
  (help) => help.articles
)

export const selectCurrentArticle = createSelector(
  selectHelpArticles,
  (_: AppStore, articleId?: string) => articleId,
  (articles, articleId) => (articleId ? articles[articleId] : undefined)
)

export const selectHelpAssets = createSelector(
  (state: AppStore) => state.help.data.assets,
  (assets) => assets
)

export const selectRatedArticles = createSelector(
  (state: AppStore) => state.help.ratedArticles,
  (ratedArticles) => ratedArticles
)

export const selectArticleRateStatus = createSelector(
  (state: AppStore) => state.help.ratedArticles,
  (_: AppStore, articleId: string) => articleId,
  (ratedArticles, articleId) => ratedArticles.includes(articleId)
)

const selectHelpShortcuts = createSelector(
  (state: AppStore) => state.help.data.shortcuts,
  (shortcuts) => shortcuts
)

export const selectHelpShortcut = createSelector(
  selectHelpShortcuts,
  (_: AppStore, shortcut: string) => shortcut,
  (shortcuts, shortcut) => shortcuts[shortcut]
)

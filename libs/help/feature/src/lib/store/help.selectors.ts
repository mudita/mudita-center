/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"

export const selectHelp = createSelector(
  (state: AppState) => state.help,
  (help) => help
)

export const selectHelpCategoriesList = createSelector(selectHelp, (help) =>
  Object.values(help.data.categories).sort((a, b) => a.order - b.order)
)

export const selectHelpArticles = createSelector(
  selectHelp,
  (help) => help.data.articles
)

export const selectCurrentArticle = createSelector(
  selectHelpArticles,
  (_: AppState, articleId?: string) => articleId,
  (articles, articleId) => (articleId ? articles[articleId] : undefined)
)

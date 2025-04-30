/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"

export const selectNews = createSelector(
  (state: AppState) => state.news,
  (news) => {
    return news.items
  }
)

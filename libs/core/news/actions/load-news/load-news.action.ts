/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setNews } from "Core/news/actions/set-news/set-news.action"
import { NewsEvent } from "Core/news/constants"
import {
  getOfflineNews,
  getUpdatedNews,
} from "Core/news/requests/get-news.request"
import { selectOnlineStatusSelector } from "shared/app-state"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const loadNews = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(NewsEvent.LoadNews, async (_, { dispatch, getState }) => {
  const state = getState()
  const onlineStatus = selectOnlineStatusSelector(getState())

  if (state.news.newsItems.length === 0) {
    const offlineNews = await getOfflineNews()
    dispatch(setNews(offlineNews.newsItems))
  }

  if (onlineStatus) {
    const updatedNews = await getUpdatedNews()
    if (updatedNews?.newsItems) {
      dispatch(setNews(updatedNews.newsItems))
    }
  }
})

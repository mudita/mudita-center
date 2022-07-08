/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setNews } from "App/news/actions/set-news/set-news.action"
import { NewsEvent } from "App/news/constants"
import {
  getOfflineNews,
  getUpdatedNews,
} from "App/news/requests/get-news.request"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const loadNews = createAsyncThunk<void, undefined>(
  NewsEvent.LoadNews,
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState & ReduxRootState

    const offlineNews = await getOfflineNews()
    dispatch(setNews(offlineNews.newsItems))

    if (state.networkStatus.online) {
      const updatedNews = await getUpdatedNews()
      if (updatedNews?.newsItems) {
        dispatch(setNews(updatedNews.newsItems))
      }
    }
  }
)

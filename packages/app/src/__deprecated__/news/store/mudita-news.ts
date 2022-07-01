/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RootState } from "App/__deprecated__/renderer/store"
import { createModel } from "@rematch/core"
import { Slicer } from "@rematch/select"
import { Store } from "App/__deprecated__/news/store/mudita-news.interface"
import { sortByCreationDateInDescendingOrder } from "App/__deprecated__/news/helpers/sort-by-creation-date-in-descending-order.helpers"
import {
  getUpdatedNews,
  getOfflineNews,
} from "App/__deprecated__/renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/__deprecated__/main/default-news-item"
import { RootModel } from "App/__deprecated__/renderer/models/models"

const initialState: Store = {
  newsItems: [],
}

const muditaNews = createModel<RootModel>({
  state: initialState,
  reducers: {
    update(state: Store, payload: Partial<Store>) {
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    return {
      async loadData(
        _: any,
        rootState: { networkStatus: { online: boolean } }
      ) {
        // first load offline data and display it to user
        const offlineNews = await getOfflineNews()
        dispatch.muditaNews.update(offlineNews)

        // then try to fetch display the latest news
        // it may take some time
        if (rootState.networkStatus.online) {
          const defaultNews: DefaultNewsItems = await getUpdatedNews()
          dispatch.muditaNews.update(defaultNews)
        }
      },
      async updateData(data: DefaultNewsItems | { updating: boolean }) {
        dispatch.muditaNews.update(data)
      },
    }
  },
  selectors: (slice: Slicer<typeof initialState>) => ({
    newsSortedByCreationDateInDescendingOrder() {
      return slice((state) => {
        return sortByCreationDateInDescendingOrder(state.newsItems)
      })
    },
  }),
})

export default muditaNews

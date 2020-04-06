import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/mudita-news/mudita-news.interface"
import { Slicer } from "@rematch/select"
import { sortByCreationDateInDescendingOrder } from "Renderer/models/mudita-news/sort-by-creation-date-in-descending-order"
import { getNews, initNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import {
  downloadComments,
  downloadContentful,
} from "Renderer/models/mudita-news/download-contentful-and-comments"

const initialState: Store = {
  newsIds: [],
  newsItems: [],
  commentsCount: {},
}

export default {
  state: initialState,
  reducers: {
    update(state: Store, payload: Partial<Store>) {
      console.log(payload)
      return { ...state, ...payload }
    },
    updateOffline(state: Store, payload: DefaultNewsItems) {
      return {
        ...state,
        newsItems: payload.newsItems,
        commentsCount: payload.commentsCount,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      const data = await initNews()
      dispatch.muditaNews.update(data)
    },
    async loadOfflineData() {
      const defaultNews: DefaultNewsItems = await getNews()
      dispatch.muditaNews.updateOffline(defaultNews)
    },
    async updateData(data: any) {
      dispatch.muditaNews.update(data)
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({
    newsSortedByCreationDateInDescendingOrder() {
      return slice(state => {
        return sortByCreationDateInDescendingOrder(state.newsItems)
      })
    },
  }),
}

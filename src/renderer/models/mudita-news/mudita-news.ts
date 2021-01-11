import { RootState } from "Renderer/store"
import { Store } from "Renderer/models/mudita-news/mudita-news.interface"
import { Slicer } from "@rematch/select"
import { sortByCreationDateInDescendingOrder } from "Renderer/models/mudita-news/sort-by-creation-date-in-descending-order"
import { getNews, initNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

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
    const dispatch = (d as unknown) as RootState

    return {
      async loadData(
        _: any,
        rootState: { networkStatus: { online: boolean } }
      ) {
        if (rootState.networkStatus.online) {
          const data = await initNews()
          dispatch.muditaNews.update(data)
        } else {
          const defaultNews: DefaultNewsItems = await getNews()
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

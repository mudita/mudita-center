import { Dispatch } from "Renderer/store"
import { SimCard, Store } from "Renderer/models/basic-info/interfaces"
import client from "Renderer/utils/contentful-client"
import { Slicer } from "@rematch/select"

const initialState = {
  newsItems: [],
}

export default {
  state: initialState,
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      const newsItems = await client.getEntries({
        content_type: "newsItem",
      })
      dispatch.muditaNews.update({
        newsItems,
      })
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({
    newsCards() {
      return slice((state: { newsItems?: any[] }) => {
        const contentfulNews = state?.newsItems?.items?.map(el => el.fields)
        return contentfulNews
      })
    },
  }),
}

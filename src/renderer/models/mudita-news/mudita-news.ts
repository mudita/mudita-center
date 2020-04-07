import { Dispatch } from "Renderer/store"
import {
  NewsEntry,
  Store,
} from "Renderer/models/mudita-news/mudita-news.interface"
import { Slicer } from "@rematch/select"
import { sortByCreationDateInDescendingOrder } from "Renderer/models/mudita-news/sort-by-creation-date-in-descending-order"
import { getNews, initNews } from "Renderer/requests/get-news.request"
import { DefaultNewsItems } from "App/main/default-news-item"
import axios from "axios"
import { Asset, Entry } from "contentful"
import { getBase64 } from "Renderer/models/mudita-news/get-base-64"

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
      const {
        data: { items, includes },
      } = await axios.get(
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
      )
      const news = items.map(({ fields, sys }: Entry<NewsEntry>) => {
        return {
          ...fields,
          newsId: sys.id,
          updatedAt: sys.updatedAt,
          createdAt: sys.createdAt,
          imageId: fields?.image?.sys?.id,
        }
      })
      for (const item of news) {
        const {
          fields: {
            title,
            file: { url },
          },
        } = includes.Asset.find((asset: Asset) => {
          return item?.image?.sys?.id === asset.sys.id
        })
        item.imageSource = await getBase64(url)
        item.imageAlt = title
      }
      // const imageUrls = news.map(item => item.imageSource)
      // const imageCalls = imageUrls.map(url => getBase64(url))
      // const base64Urls = await Promise.all(imageCalls)
      console.log(news)
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

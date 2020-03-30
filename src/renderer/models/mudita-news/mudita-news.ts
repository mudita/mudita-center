import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/basic-info/interfaces"
import { Slicer } from "@rematch/select"
import axios from "axios"
import { Asset, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

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
      try {
        const newsItems = await axios.get(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
        )
        console.log(newsItems)
        dispatch.muditaNews.update({
          newsItems: newsItems.data,
        })
      } catch (error) {
        console.error(error)
      }
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({
    newsCards() {
      return slice((state: { newsItems?: EntryCollection<NewsEntry> }) => {
        const newsCards = state?.newsItems?.items?.map(item => item.fields)
        const newsImages = state?.newsItems?.includes?.Asset?.map(
          (image: Asset) => {
            return {
              imageSource: image.fields.file.url,
              imageAlt: image.fields.title,
            }
          }
        )
        return newsCards?.map((newsCard, index) => {
          return { ...newsCard, ...newsImages[index] }
        })
      })
    },
  }),
}

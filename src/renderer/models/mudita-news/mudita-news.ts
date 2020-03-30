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
          "https://cdn.contentful.com/spaces/isxmxtc67n72/environments/master/entries/?access_token=4OjM0WvVo9FOXtnUmZdCKflW_Ra9qD--W8hdTvTVwGM&content_type=newsItem"
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
        const images = state?.newsItems?.includes?.Asset?.map(
          (asset: Asset) => {
            return {
              imageSource: asset.fields.file.url,
              imageAlt: asset.fields.title,
            }
          }
        )
        return newsCards?.map((newsCard, index) => {
          return { ...newsCard, ...images[index] }
        })
      })
    },
  }),
}

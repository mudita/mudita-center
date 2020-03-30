import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/basic-info/interfaces"
import { Slicer } from "@rematch/select"
import axios from "axios"
import { Asset, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

const initialState = {
  newsItems: [],
  newsImages: [],
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
        return state?.newsItems?.items?.map(item => item.fields)
      })
    },
    newsImages() {
      return slice((state: { newsItems?: EntryCollection<NewsEntry> }) => {
        return state?.newsItems?.includes?.Asset?.map((asset: Asset) => {
          return { url: asset.fields.file.url, title: asset.fields.title }
        })
      })
    },
  }),
}

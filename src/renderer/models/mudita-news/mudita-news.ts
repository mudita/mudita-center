import { Dispatch } from "Renderer/store"
import axios from "axios"
import { Asset } from "contentful"
import {
  DownloadError,
  NewsEntry,
  Store,
} from "Renderer/models/mudita-news/mudita-news.interface"
import { Slicer } from "@rematch/select"
import { sortByCreationDateInDescendingOrder } from "Renderer/models/mudita-news/sort-by-creation-date-in-descending-order"

const initialState: Store = {
  newsIds: [],
  newsItems: [],
}

export default {
  state: initialState,
  reducers: {
    update(state: Store, payload: NewsEntry[]) {
      return { ...state, newsItems: payload }
    },
    updateError(state: Store, payload: DownloadError) {
      return {
        ...state,
        downloadError: payload,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      const getCommentsCountByDiscussionId = async (
        discussionId?: string
      ): Promise<{ count: number }> => {
        const {
          data: { posts_count },
        } = await axios.get(
          `${process.env.MUDITA_COMMUNITY_URL}/t/${discussionId}.json`
        )
        return posts_count
      }

      try {
        const {
          data: { items, includes },
        } = await axios.get(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem&limit=3`
        )
        const news = []
        for (const { fields, sys } of items) {
          const {
            fields: {
              title,
              file: { url },
            },
          } = includes.Asset.find((asset: Asset) => {
            return fields?.image?.sys?.id === asset.sys.id
          })
          news.push({
            ...fields,
            newsId: sys.id,
            createdAt: sys.createdAt,
            imageId: fields?.image?.sys?.id,
            imageSource: url,
            imageAlt: title,
            commentsCount: await getCommentsCountByDiscussionId(
              fields.discussionId
            ),
          })
        }
        dispatch.muditaNews.update(news)
      } catch (error) {
        dispatch.muditaNews.updateError(error)
      }
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

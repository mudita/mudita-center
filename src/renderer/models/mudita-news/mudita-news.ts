import { Dispatch } from "Renderer/store"
import axios from "axios"
import { Entry, Asset } from "contentful"
import {
  DownloadError,
  IdItem,
  NewsEntry,
  Store,
} from "Renderer/models/mudita-news/mudita-news.interface"
import { Slicer } from "@rematch/select"
import { sortByCreationDateInDescendingOrder } from "Renderer/models/mudita-news/sort-by-creation-date-in-descending-order"

const initialState: Store = {
  newsIds: [],
  newsItems: {},
  commentsCount: {},
}

export default {
  state: initialState,
  reducers: {
    update(state: Store, payload: NewsEntry[]) {
      const newsIds = payload.map(
        (news: NewsEntry): IdItem => ({
          id: news.newsId,
          createdAt: news.createdAt,
        })
      )
      const newsItems = payload.reduce(
        (acc: Record<string, NewsEntry>, newsItem: NewsEntry) => {
          acc[newsItem.newsId] = newsItem
          return acc
        },
        {} as Record<string, NewsEntry>
      )
      return { ...state, newsIds, newsItems }
    },
    updateComments(state: Store, payload: { newsId: string; count: number }[]) {
      const counts = payload.reduce((acc, { newsId, count }) => {
        acc[newsId] = count
        return acc
      }, {} as Record<string, number>)
      return {
        ...state,
        commentsCount: {
          ...state.commentsCount,
          ...counts,
        },
      }
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
        discussionId?: string,
        newsId?: string
      ): Promise<{ newsId?: string; count: number }> => {
        const {
          data: { posts_count },
        } = await axios.get(
          `${process.env.GATSBY_COMMUNITY_URL}/t/${discussionId}.json`
        )
        return { newsId, count: posts_count }
      }
      try {
        const {
          data: { items, includes },
        } = await axios.get(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
        )
        const news = items.map(({ fields, sys }: Entry<NewsEntry>) => {
          return {
            ...fields,
            newsId: sys.id,
            createdAt: sys.createdAt,
            imageId: fields?.image?.sys?.id,
          }
        })
        news.forEach((item: NewsEntry) => {
          const {
            fields: {
              title,
              file: { url },
            },
          } = includes.Asset.find((asset: Asset) => {
            return item?.image?.sys?.id === asset.sys.id
          })
          item.imageSource = url
          item.imageAlt = title
        })
        dispatch.muditaNews.update(news)
        const commentsCalls = news.map(
          ({
            discussionId,
            newsId,
          }: Partial<NewsEntry>): Promise<{
            newsId?: string
            discussionId?: string
            count: number
          }> => getCommentsCountByDiscussionId(discussionId, newsId)
        )
        const commentsCounts: {
          newsId: string
          count: number
        }[] = await Promise.all(commentsCalls)
        dispatch.muditaNews.updateComments(commentsCounts)
      } catch (error) {
        dispatch.muditaNews.updateError(error)
        console.error(error)
      }
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({
    sortedIds() {
      return slice(state => {
        return sortByCreationDateInDescendingOrder(state.newsIds)
      })
    },
  }),
}

import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/basic-info/interfaces"
import { Slicer } from "@rematch/select"
import axios from "axios"
import { Asset, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

const initialState = {
  newsIds: [],
  newsItems: {},
  commentsCount: {},
}

export default {
  state: initialState,
  reducers: {
    update(state: Store, payload: any) {
      const newsIds = payload.map((news: NewsEntry) => news.discussionId)
      const newsItems = payload.reduce(
        (acc: Record<string, NewsEntry>, newsItem: NewsEntry) => {
          acc[newsItem.discussionId] = newsItem
          return acc
        },
        {} as Record<string, NewsEntry>
      )
      return { ...state, newsIds, newsItems }
    },
    updateComments(
      state: Store,
      payload: { discussionId: number; count: number }[]
    ) {
      const counts = payload.reduce((acc, { discussionId, count }) => {
        acc[discussionId] = count
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
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      const getCommentsCountByDiscussionId = async (discussionId: number) => {
        const {
          data: { posts_count },
        } = await axios.get(
          `${process.env.GATSBY_COMMUNITY_URL}/t/${discussionId}.json`
        )
        return { discussionId, count: posts_count }
      }
      try {
        const {
          data: { items },
        } = await axios.get(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
        )
        const news = items.map(({ fields }: NewsEntry[]) => fields)
        console.log(news)
        dispatch.muditaNews.update(news)
        const commentsCalls = news.map(({ discussionId }) =>
          getCommentsCountByDiscussionId(discussionId)
        )
        const commentsCounts = await Promise.all(commentsCalls)
        dispatch.muditaNews.updateComments(commentsCounts)
      } catch (error) {
        console.error(error)
      }
    },
  }),
  selectors: (slice: Slicer<typeof initialState>) => ({}),
}

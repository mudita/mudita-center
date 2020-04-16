import axios from "axios"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export const downloadComments = async (news: any) => {
  const getCommentsCountByDiscussionId = async (
    discussionId?: string,
    newsId?: string
  ): Promise<{ newsId?: string; count: number }> => {
    const {
      data: { posts_count },
    } = await axios.get(
      `${process.env.MUDITA_COMMUNITY_URL}/t/${discussionId}.json`
    )
    return { newsId, count: posts_count }
  }

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
  const commentsCounts = await Promise.all<{
    newsId: string
    count: number
  }>(commentsCalls)

  const counts = commentsCounts.reduce((acc, { newsId, count }) => {
    acc[newsId] = count
    return acc
  }, {} as Record<string, number>)

  return {
    commentsCount: counts,
  }
}

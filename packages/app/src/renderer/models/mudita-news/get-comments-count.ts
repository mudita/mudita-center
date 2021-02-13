import axios from "axios"

export const getCommentsCount = async (discussionId: string) => {
  const {
    data: { posts_count },
  } = await axios.get(
    `${process.env.MUDITA_COMMUNITY_URL}/t/${discussionId}.json`
  )
  return posts_count
}

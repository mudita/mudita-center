import { Asset, Entry, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { getBase64 } from "Renderer/models/mudita-news/get-base-64"
import { getCommentsCount } from "Renderer/models/mudita-news/get-comments-count"

export const normalizeContentfulData = async (
  data: EntryCollection<NewsEntry>
) => {
  const { items, includes } = data
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
    item.commentsCount = await getCommentsCount(item.discussionId)
    item.imageSource = await getBase64(url)
    item.imageAlt = title
  }
  return {
    newsItems: news,
  }
}

import { Asset, Entry, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

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
  return {
    newsItems: news,
  }
}

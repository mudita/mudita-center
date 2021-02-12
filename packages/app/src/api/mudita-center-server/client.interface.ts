import { EntryCollection, SyncCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export interface ClientInterface {
  getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>>
  getHelp(query: Record<string, any>): Promise<SyncCollection>
}

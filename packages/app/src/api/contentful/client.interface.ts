import { EntryCollection, SyncCollection } from "contentful"

export interface ClientInterface {
  getNews<Entry>(): Promise<EntryCollection<Entry>>
  getHelp(query: Record<string, any>): Promise<SyncCollection>
}

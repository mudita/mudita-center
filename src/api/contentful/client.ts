import {
  ContentfulClientApi,
  createClient,
  EntryCollection,
  SyncCollection,
} from "contentful"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"

export class Client
  implements Pick<ContentfulClientApi, "getEntries" | "sync"> {
  client: ContentfulClientApi
  constructor(config: { resource: ContentfulResource }) {
    this.client =
      config.resource === ContentfulResource.Help
        ? createClient({
            accessToken: process.env.MC_CONTENTFUL_ACCESS_TOKEN as string,
            space: process.env.MC_CONTENTFUL_SPACE_ID as string,
            environment: process.env.MC_CONTENTFUL_ENVIRONMENT_ID,
            host: process.env.MC_CONTENTFUL_HOST,
          })
        : createClient({
            accessToken: process.env
              .MUDITA_WEB_CONTENTFUL_ACCESS_TOKEN as string,
            space: process.env.MUDITA_WEB_CONTENTFUL_SPACE_ID as string,
          })
  }

  getEntries<T>(query: any): Promise<EntryCollection<T>> {
    return this.client.getEntries({
      content_type: "newsItem",
      limit: 3,
    })
  }

  sync(query: any): Promise<SyncCollection> {
    return this.client.sync(query)
  }
}

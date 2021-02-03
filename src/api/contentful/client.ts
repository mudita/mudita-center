import {
  ContentfulClientApi,
  EntryCollection,
  SyncCollection,
} from "contentful"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"
import fetch from "node-fetch"

export class Client
  implements Pick<ContentfulClientApi, "getEntries" | "sync"> {
  resource: ContentfulResource
  constructor(config: { resource: ContentfulResource }) {
    this.resource = config.resource
  }

  async getEntries<T>(query: any): Promise<Response> {
    const response = await fetch(
      "https://pmjrquus6h.execute-api.eu-central-1.amazonaws.com/Prod/",
      {
        method: "post",
        body: JSON.stringify({
          resource: this.resource,
          method: "getEntries",
          query,
        }),
      }
    )
    return await response.json()
  }

  async sync(query: any): Promise<SyncCollection> {
    const response = await fetch(
      "https://pmjrquus6h.execute-api.eu-central-1.amazonaws.com/Prod/",
      {
        method: "post",
        body: JSON.stringify({
          resource: this.resource,
          method: "sync",
          query,
        }),
      }
    )
    return await response.json()
  }
}

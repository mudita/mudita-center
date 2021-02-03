import {
  ContentfulClientApi,
  EntryCollection,
  SyncCollection,
} from "contentful"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"
import axios, { AxiosInstance } from "axios"

export class Client
  implements Pick<ContentfulClientApi, "getEntries" | "sync"> {
  resource: ContentfulResource
  client: AxiosInstance
  constructor(config: { resource: ContentfulResource }) {
    this.resource = config.resource
    this.client = axios.create({
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
    })
  }

  async getEntries<T>(query: any): Promise<EntryCollection<any>> {
    const { data } = await this.client.post(
      "https://pmjrquus6h.execute-api.eu-central-1.amazonaws.com/Prod/",
      JSON.stringify({
        resource: this.resource,
        method: "getEntries",
        query,
      })
    )
    return data
  }

  async sync(query: any): Promise<SyncCollection> {
    const { data } = await this.client.post(
      "https://pmjrquus6h.execute-api.eu-central-1.amazonaws.com/Prod/",
      JSON.stringify({
        resource: this.resource,
        method: "sync",
        query,
      })
    )
    return data
  }
}

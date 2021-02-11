import {
  EntryCollection,
  SyncCollection,
} from "contentful"
import { MuditaCenterServerResource } from "App/api/contentful/contentful-resource.enum"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ClientErrors } from "App/api/contentful/client-errors.enum"
import { ClientInterface } from "App/api/contentful/client.interface"

export class Client
  implements ClientInterface {
  private client: AxiosInstance
  constructor() {
    this.client = axios.create()
  }

  async getNews<Entry>(): Promise<EntryCollection<Entry>> {
    try {
      const { data }: AxiosResponse = await this.client.get(
        `${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerResource.News}`
      )
      return data
    } catch (error) {
      throw new Error(`${ClientErrors.InvalidQuery}: ${error}`)
    }
  }

  async getHelp(query: Record<string, any>): Promise<SyncCollection> {
    try {
      const params = new URLSearchParams({
        query: JSON.stringify(query),
      })
      const { data }: AxiosResponse = await this.client.get(
        `${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerResource.Help}`,
        { params }
      )
      return data
    } catch (error) {
      throw new Error(`${ClientErrors.InvalidQuery}: ${error}`)
    }
  }
}

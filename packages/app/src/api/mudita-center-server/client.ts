import { EntryCollection, SyncCollection } from "contentful"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ClientInterface } from "App/api/mudita-center-server/client.interface"
import { MuditaCenterServerRoutes } from "App/api/mudita-center-server/mudita-center-server-routes"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export class Client implements ClientInterface {
  private httpClient: AxiosInstance
  constructor() {
    this.httpClient = axios.create()
  }

  async getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>> {
    try {
      const params = new URLSearchParams({
        query: JSON.stringify(query),
      })
      const { data }: AxiosResponse = await this.httpClient.get(
        `${process.env.MUDITA_CENTER_SERVER_URL as string}/${
          MuditaCenterServerRoutes.News
        }`,
        { params }
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async getHelp(query: Record<string, any>): Promise<SyncCollection> {
    try {
      const params = new URLSearchParams({
        query: JSON.stringify(query),
      })
      const { data }: AxiosResponse = await this.httpClient.get(
        `${process.env.MUDITA_CENTER_SERVER_URL as string}/${
          MuditaCenterServerRoutes.Help
        }`,
        { params }
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}

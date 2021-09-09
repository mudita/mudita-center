/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntryCollection, SyncCollection } from "contentful"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import {
  ClientInterface,
  HelpQuery,
} from "App/api/mudita-center-server/client.interface"
import { MuditaCenterServerRoutes } from "App/api/mudita-center-server/mudita-center-server-routes"
import { NewsEntry } from "App/news/store/mudita-news.interface"

export class Client implements ClientInterface {
  private httpClient: AxiosInstance = axios.create()

  async getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>> {
    try {
      const params = new URLSearchParams({
        limit: String(query.limit),
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

  async getHelp(query: HelpQuery): Promise<SyncCollection> {
    try {
      const params = new URLSearchParams({
        locale: query.locale as string,
      })
      if (query.nextSyncToken) {
        params.append("nextSyncToken", query.nextSyncToken)
      }
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

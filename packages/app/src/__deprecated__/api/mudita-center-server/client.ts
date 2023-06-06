/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/news/dto"
import { OsEnvironment } from "App/update/constants"
import { ReleaseManifest } from "App/update/dto"
import {
  ClientInterface,
  HelpQuery,
} from "App/__deprecated__/api/mudita-center-server/client.interface"
import { MuditaCenterServerRoutes } from "App/__deprecated__/api/mudita-center-server/mudita-center-server-routes"
import { Product } from "App/__deprecated__/main/constants"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { EntryCollection, SyncCollection } from "contentful"
import https from "https"

export interface getLatestProductionReleaseParams {
  product: Product
  version: "latest" | string
  environment: OsEnvironment
}

export class Client implements ClientInterface {
  private httpClient: AxiosInstance

  constructor(timeout?: number) {
    this.httpClient = axios.create({
      baseURL: process.env.MUDITA_CENTER_SERVER_URL as string,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout,
    })
  }

  async getNews(query: { limit: number }): Promise<EntryCollection<NewsEntry>> {
    try {
      const params = new URLSearchParams({
        limit: String(query.limit),
      })
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data }: AxiosResponse = await this.httpClient.get(
        MuditaCenterServerRoutes.News,
        { params }
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data }: AxiosResponse = await this.httpClient.get(
        MuditaCenterServerRoutes.Help,
        { params }
      )

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getLatestRelease(
    params: getLatestProductionReleaseParams
  ): Promise<AxiosResponse<ReleaseManifest>> {
    return this.httpClient.get(MuditaCenterServerRoutes.GetReleaseV2, {
      params,
    })
  }
}

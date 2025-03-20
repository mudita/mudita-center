/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosInstance, AxiosResponse } from "axios"
import { EntryCollection } from "contentful"
import https from "https"
import { MuditaCenterServerRoutes } from "shared/utils"
import { NewsEntry } from "Core/news/dto"
import { OsEnvironment } from "Core/update/constants"
import { ReleaseManifest } from "Core/update/dto"
import { ClientInterface } from "Core/__deprecated__/api/mudita-center-server/client.interface"
import { Product } from "Core/__deprecated__/main/constants"

export interface getLatestProductionReleaseParams {
  product: Product
  version: "latest" | string
  environment: OsEnvironment
  deviceSerialNumber?: string
}

interface ExternalUsageDeviceQueryParams {
  "serial-number": string
}

interface ExternalUsageDeviceResponse {
  externalUsage: boolean
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

  async getExternalUsageDevice(serialNumber: string): Promise<boolean> {
    try {
      const params: ExternalUsageDeviceQueryParams = {
        "serial-number": serialNumber,
      }

      const response = await this.httpClient.get<
        ExternalUsageDeviceQueryParams,
        AxiosResponse<ExternalUsageDeviceResponse>
      >(MuditaCenterServerRoutes.ExternalUsageDevice, { params })

      return response.data.externalUsage
    } catch (_) {
      return false
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

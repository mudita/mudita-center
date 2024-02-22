/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import {
  FetchDataOptions,
  GetActionEventsByCategoryIdOptions,
  GetActionEventsOptions,
  GetCategoryEventByLabelOptions,
  MatomoData,
  MatomoEvent,
} from "../matomo/matomo-data.interface"
import generateDateRange from "../utils/generate-date-range"

const MATOMO_API_URL: string = process.env.MATOMO_TO_GSHEET_API_URL!
const MATOMO_SITE_ID: string = process.env.MATOMO_TO_GSHEET_SITE_ID!
const MATOMO_TOKEN: string = process.env.MATOMO_TO_GSHEET_TOKEN!

class MatomoService {
  public async fetchMatomoData({
    startDate,
    endDate,
    label,
  }: FetchDataOptions): Promise<MatomoData> {
    const data: MatomoData = {}
    const dateRange = generateDateRange(startDate, endDate)

    for (const date of dateRange) {
      data[date] = await this.getActionEvents({ date, label })
    }

    return data
  }

  private async getActionEvents({
    date,
    label,
  }: GetActionEventsOptions): Promise<MatomoEvent[]> {
    const categoryEvent = await this.getCategoryEventByLabel({ date, label })

    const id = categoryEvent?.idsubdatatable
    if (id === undefined) {
      return []
    }

    const actionEvents = await this.getActionEventsByCategoryId({
      date,
      id,
    })
    return actionEvents.filter((event) => event.label.includes("latest"))
  }

  private async getCategoryEventByLabel({
    date,
    label,
  }: GetCategoryEventByLabelOptions): Promise<MatomoEvent | undefined> {
    try {
      const url = this.buildUrl({
        method: "Events.getCategory",
        period: "day",
        date: date,
      })
      const response = await axios.get<MatomoEvent[]>(url)

      // @ts-ignore
      if (response.data.result === "error") {
        console.error(
          "Error while retrieving getCategoryEventByLabel:",
          response.data
        )
        return undefined
      }

      return response.data.find((event) => event.label === label)
    } catch (error) {
      console.error("Error while retrieving getCategoryEventByLabel:", error)

      return undefined
    }
  }

  private async getActionEventsByCategoryId({
    date,
    id,
  }: GetActionEventsByCategoryIdOptions): Promise<MatomoEvent[]> {
    try {
      const url = this.buildUrl({
        method: "Events.getActionFromCategoryId",
        period: "day",
        date: date,
        idSubtable: id,
      })
      const response = await axios.get<MatomoEvent[]>(url)

      // @ts-ignore
      if (response.data.result === "error") {
        console.error(
          "Error while retrieving getActionEventsByCategoryId:",
          response.data
        )
        return []
      }

      return response.data as MatomoEvent[]
    } catch (error) {
      console.error(
        "Error while retrieving getActionEventsByCategoryId:",
        error
      )
      return []
    }
  }

  private buildUrl(params: Record<string, string>): string {
    const url = new URL(MATOMO_API_URL)
    url.search = new URLSearchParams({
      module: "API",
      format: "JSON",
      idSite: MATOMO_SITE_ID,
      token_auth: MATOMO_TOKEN,
      ...params,
    }).toString()
    return url.toString()
  }
}

export default MatomoService

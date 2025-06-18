/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import lodash from "lodash"
import { AnalyticsEvent } from "app-utils/models"
import { JsonStore } from "../json-store"

type CacheMap = Record<string, AnalyticsEvent>

const delay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const ANALYTICS_JSON_STORE_NAME = "analytics-cache"

export class AnalyticsCacheService {
  private cache: CacheMap = {}
  private initialized = false

  constructor() {
    void this.init()
  }

  public async isEventUnique(event: AnalyticsEvent): Promise<boolean> {
    await this.waitForInitialization()

    const id = this.getEventId(event)
    if (id === undefined) {
      return false
    } else {
      return JSON.stringify(this.cache[id]) !== JSON.stringify(event)
    }
  }

  public async saveEvent(event: AnalyticsEvent): Promise<void> {
    const id = this.getEventId(event)
    if (id !== undefined) {
      this.cache[id] = event
      await JsonStore.set({
        name: ANALYTICS_JSON_STORE_NAME,
        data: this.cache,
      })
    }
  }

  private async init(): Promise<void> {
    setTimeout(async () => {
      await JsonStore.init({ name: ANALYTICS_JSON_STORE_NAME, data: {} })
      const data = (await JsonStore.get(ANALYTICS_JSON_STORE_NAME)) as CacheMap
      lodash.merge(this.cache, data)
      this.initialized = true
    }, 0) // Delay to ensure JsonStore is ready
  }

  private getEventId(event: AnalyticsEvent): string | undefined {
    if (event.e_c === undefined) {
      return undefined
    } else {
      const _id = event._id ? ` ${event._id}` : ""
      return `${event.e_c}${_id}`
    }
  }

  private async waitForInitialization(
    maxAttempts = 5,
    waitingTime = 100,
    attempt = 0
  ): Promise<void> {
    if (this.initialized) {
      return
    }

    if (attempt >= maxAttempts) {
      console.warn(
        "Analytics cache initialization timed out after max attempts"
      )
      return
    }
    await delay(waitingTime)
    return this.waitForInitialization(maxAttempts, attempt + 1)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { Endpoint, Method } from "core-device/models"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { QuotationsError } from "Core/quotations/service/error.constant"

export class QuotationsService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  public async getSettings() {
    const currentGroupResponse = await this.deviceProtocol.device.request<{
      group: string
    }>({
      endpoint: Endpoint.Quotations,
      method: Method.Get,
      body: {
        settings: "group",
      },
    })

    const currentIntervalResponse = await this.deviceProtocol.device.request<{
      interval: string
    }>({
      endpoint: Endpoint.Quotations,
      method: Method.Get,
      body: {
        settings: "interval",
      },
    })

    if (!currentGroupResponse.ok || !currentIntervalResponse.ok) {
      return Result.failed(
        new AppError(
          QuotationsError.GettingSettingsFailed,
          "Getting quotations settings failed"
        )
      )
    }
    const interval = currentIntervalResponse.data.interval
    return Result.success({
      group: currentGroupResponse.data.group,
      interval: interval !== "AtMidnight" ? parseInt(interval) : interval,
    })
  }

  public async updateSettings(options: {
    group?: string
    interval?: string | number
  }) {
    if (options.group) {
      const response = await this.deviceProtocol.device.request({
        endpoint: Endpoint.Quotations,
        method: Method.Put,
        body: {
          group: options.group,
        },
      })
      if (!response.ok) {
        return Result.failed(
          new AppError(
            QuotationsError.UpdatingSettingsFailed,
            "Updating quotations settings failed"
          )
        )
      }
    }

    if (options.interval) {
      const response = await this.deviceProtocol.device.request({
        endpoint: Endpoint.Quotations,
        method: Method.Put,
        body: {
          interval: `${options.interval}`,
        },
      })

      if (!response.ok) {
        return Result.failed(
          new AppError(
            QuotationsError.UpdatingSettingsFailed,
            "Updating quotations settings failed"
          )
        )
      }
    }

    return Result.success(true)
  }
}

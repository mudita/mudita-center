/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import FormData from "form-data"
import path from "path"
import axios, { AxiosRequestConfig, isAxiosError } from "axios"
import {
  AppErrorName,
  AppHttpFailedResult,
  AppHttpRequestConfig,
  AppHttpResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"

export class AppHttpService {
  static async request<Data = unknown>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResult<Data>> {
    try {
      const axiosConfig = await this.mapToAxiosConfig(config)
      const { data, status } = await axios.request<Data>(axiosConfig)
      return AppResultFactory.success(data, { status })
    } catch (error) {
      return this.mapToAppHttpFailedResult<Data>(error)
    }
  }

  private static mapToAppHttpFailedResult<ErrorData = unknown>(
    error: unknown
  ): AppHttpFailedResult<AppErrorName, ErrorData> {
    if (isAxiosError(error)) {
      return AppResultFactory.failed(
        mapToAppError(error),
        error.response?.data as ErrorData,
        { status: error.response?.status }
      )
    }
    return AppResultFactory.failed(mapToAppError(error))
  }

  private static async mapToAxiosConfig(
    config: AppHttpRequestConfig
  ): Promise<AxiosRequestConfig> {
    const axiosConfig: AxiosRequestConfig = { ...config }

    if (config.files && Object.keys(config.files).length > 0) {
      axiosConfig.data = await this.buildFormData(config.files, config.data)

      for (const key of Object.keys(axiosConfig.headers ?? {})) {
        if (key.toLowerCase() === "content-type") {
          delete axiosConfig.headers?.[key]
        }
      }
    }

    return axiosConfig
  }

  private static async buildFormData(
    files: Record<string, string>,
    data: Record<string, unknown> = {}
  ): Promise<FormData> {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }

    for (const [field, filePath] of Object.entries(files)) {
      const stream = fs.createReadStream(filePath)
      const fileName = path.basename(filePath)
      formData.append(field, stream, fileName)
    }
    return formData
  }
}

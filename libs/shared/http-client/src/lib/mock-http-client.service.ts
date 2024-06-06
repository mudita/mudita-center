/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, AxiosResponse } from "axios"
import { MockHttpStateService } from "e2e-mock-server"
import { BaseHttpClientService } from "./base-http-client.service"

export class MockHttpClientService extends BaseHttpClientService {
  constructor(private mockHttpStateService: MockHttpStateService) {
    super()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    const response = await this.mockHttpStateService.getMockResponse<T, R>(
      url,
      "GET"
    )
    if (response === undefined) {
      return super.get<T, R>(url, config)
    } else {
      return response
    }
  }
}

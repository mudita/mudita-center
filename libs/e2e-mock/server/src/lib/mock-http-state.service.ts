/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios"

const url = process.env.MUDITA_CENTER_SERVER_URL ?? ""

const defaultResponse: AxiosResponse = {
  status: 200,
  statusText: "Ok",
  headers: {} as AxiosResponseHeaders,
  config: {} as AxiosRequestConfig,
  data: undefined,
}

export class MockHttpStateService {
  private mockResponses: Record<string, AxiosResponse> = {}

  mockAppConfigurationResponse(response: Partial<AxiosResponse>) {
    this.mockResponses = {
      ...this.mockResponses,
      [`${url}/v2-app-configuration`]: {
        ...defaultResponse,
        ...response,
      },
    }
  }

  getMockResponsesByUrl<T = any, R = AxiosResponse<T>>(
    url: string
  ): Promise<R | undefined> {
    return Promise.resolve(this.mockResponses[url] as R | undefined)
  }
}

export const mockHttpStateService = new MockHttpStateService()

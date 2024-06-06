/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios"

export type MockHttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface MockHttpResponse extends Partial<AxiosResponse> {
  url: string
  method: MockHttpMethod
}

const defaultResponse: AxiosResponse = {
  status: 200,
  statusText: "Ok",
  headers: {} as AxiosResponseHeaders,
  config: {} as AxiosRequestConfig,
  data: undefined,
}

export class MockHttpStateService {
  private mockResponses: Record<string, MockHttpResponse> = {}

  mockHttpResponse(response: MockHttpResponse) {
    const key = this.buildKey(response)
    this.mockResponses = {
      ...this.mockResponses,
      [key]: {
        ...defaultResponse,
        ...response,
      },
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMockResponse<T = any, R = AxiosResponse<T>>(
    url: string,
    method: MockHttpMethod
  ): Promise<R | undefined> {
    const key = this.buildKey({ url, method })
    return Promise.resolve(this.mockResponses[key] as R | undefined)
  }

  private buildKey({ method, url }: MockHttpResponse): string {
    return `${method}:${url}`
  }

}

export const mockHttpStateService = new MockHttpStateService()

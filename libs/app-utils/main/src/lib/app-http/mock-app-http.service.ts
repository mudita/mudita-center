/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppHttpRequestConfig,
  AppHttpResult,
  MockAppHttpResponsePayload,
} from "app-utils/models"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"
import { AppHttpService } from "./app-http.service"

export class MockAppHttpService extends AppHttpService {
  private responsesMap: Map<string, AppHttpResult<unknown>> = new Map()

  constructor(private mockServer: IpcMockServer) {
    super()
    this.registerListeners()
  }

  async request<Data = unknown>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResult<Data>> {
    const mockResponse = this.findResponse<Data>(config)
    if (mockResponse) {
      return mockResponse
    } else {
      return super.request<Data>(config)
    }
  }

  private findResponse<Data = unknown>({
    method,
    url,
  }: AppHttpRequestConfig): AppHttpResult<Data> | undefined {
    const key = this.normalizeKey(url, method)
    return this.responsesMap.get(key) as AppHttpResult<Data> | undefined
  }

  private registerListeners(): void {
    this.mockServer.on(
      E2eMockIpcEvents.mockAppHttpResponse,
      this.mockAppHttpResponse
    )
  }

  private mockAppHttpResponse = async ({
    method,
    url,
    response,
  }: MockAppHttpResponsePayload): Promise<void> => {
    const key = this.normalizeKey(url, method)
    this.responsesMap.set(key, response)
  }

  private normalizeKey(url: string, method: string): string {
    const u = new URL(url, "http://dummy")
    return `${u.pathname}/${method}`
  }
}

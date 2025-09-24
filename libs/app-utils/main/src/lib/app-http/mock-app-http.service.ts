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
import { AppFileSystemService } from "../app-file-system/app-file-system.service"

const DUMMY_BASE_URL = "http://dummy"

export class MockAppHttpService extends AppHttpService {
  private responsesMap: Map<string, AppHttpResult<unknown>> = new Map()

  constructor(
    private mockServer: IpcMockServer,
    appFileSystemService: AppFileSystemService
  ) {
    super(appFileSystemService)
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
    const u = new URL(url, DUMMY_BASE_URL)
    return `${u.pathname}/${method}`
  }
}

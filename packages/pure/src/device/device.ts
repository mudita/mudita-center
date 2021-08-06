/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "./base-device"
import {
  CreateDevice,
  DeviceUpdateRequestPayload,
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "./device.types"
import {
  Contact,
  DeviceInfo,
  DeviceUpdateErrorResponse,
  DeviceUpdateResponse,
  UploadUpdateFileSystemRequestPayload,
  GetThreadResponseBody,
} from "../endpoints"
import { Formatter } from "../formatter/formatter"
import { FormatterFactory } from "../formatter/formatter-factory"
import { GetThreadsBody } from "../endpoints/messages.types"
import {
  DownloadFileSystemErrorResponse,
  DownloadFileSystemRequestPayload,
  DownloadFileSystemResponse,
  GetFileSystemErrorResponse,
  GetFileSystemRequestPayload,
  GetFileSystemResponse,
} from "../endpoints/file-system"

class Device extends BaseDevice {
  #formatter: Formatter = FormatterFactory.create()

  constructor(path: string) {
    super(path)
  }

  public async connect(): Promise<Response> {
    const response = await super.connect()
    const { body } = await super.request({
      endpoint: Endpoint.ApiVersion,
      method: Method.Get,
    })

    if (body === undefined) {
      return { status: ResponseStatus.ConnectionError }
    }

    this.#formatter = FormatterFactory.create(body.version)

    return response
  }

  public request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
  }): Promise<Response>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Put
    body: { phoneLockCode: string }
  }): Promise<Response>
  public request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<Response<DeviceInfo>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
  }): Promise<Response<{ entries: Contact[]; totalCount: number }>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetThreadsBody
  }): Promise<Response<GetThreadResponseBody>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Post
    body: Contact
  }): Promise<Response<Contact>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Put
    body: Contact
  }): Promise<Response<Contact>>
  public request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Delete
    body: Contact["id"]
  }): Promise<Response<string>>
  public request(
    config: DeviceUpdateRequestPayload
  ): Promise<DeviceUpdateResponse | DeviceUpdateErrorResponse>
  public request(
    config: GetFileSystemRequestPayload
  ): Promise<GetFileSystemResponse | GetFileSystemErrorResponse>
  public request(
    config: DownloadFileSystemRequestPayload
  ): Promise<DownloadFileSystemResponse | DownloadFileSystemErrorResponse>
  public request(
    config: UploadUpdateFileSystemRequestPayload
  ): Promise<Response>
  public request(config: RequestConfig<any>): Promise<Response<any>>
  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    const response = await super.request(config)
    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createDevice: CreateDevice = (path: string) => new Device(path)

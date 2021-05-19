/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "./base-device"
import {
  CreateDevice,
  DeviceUpdateRequestPayload,
  Endpoint,
  FileUploadRequestPayload,
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
  GetThreadResponseBody,
} from "../endpoints"
import { Formatter } from "../formatter/formatter"
import { FormatterFactory } from "../formatter/formatter-factory"
import { GetThreadsBody, Thread } from "../endpoints/messages.types"

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
  public request(config: FileUploadRequestPayload): Promise<Response>
  public request(config: RequestConfig): Promise<Response<any>>
  public async request(config: RequestConfig): Promise<Response<any>> {
    const response = await super.request(config)
    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createDevice: CreateDevice = (path: string) => new Device(path)

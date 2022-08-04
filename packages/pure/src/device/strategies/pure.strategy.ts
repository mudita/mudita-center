/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "../base-device"
import {
  CreateDeviceStrategy,
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "../device.types"
import { DeviceType } from "../constants"
import {
  Contact,
  DeviceInfo,
  DownloadFileSystemRequestConfig,
  GetBackupDeviceStatusRequestConfig,
  GetBackupDeviceStatusResponseBody,
  GetFileListBody,
  GetFileListResponseBody,
  GetFileSystemRequestConfig,
  GetFileSystemDirectoryRequestConfig,
  GetFileSystemDirectoryResponse,
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
  GetThreadResponseBody,
  PostMessagesBody,
  PostMessagesResponseBody,
  PutMessageBody,
  GetTemplateBody,
  PostTemplateBody,
  PutTemplateBody,
  DeleteTemplateBody,
  GetTemplateResponseBody,
  PostTemplateResponseBody,
  PutFileSystemErrorResponse,
  PutFileSystemRequestConfig,
  PutFileSystemResponse,
  SendFileSystemErrorResponse,
  SendFileSystemRequestConfig,
  SendFileSystemResponse,
  StartBackupRequestConfig,
  StartBackupResponseBody,
  StartRestoreRequestConfig,
  DownloadFileSystemErrorResponse,
  DownloadFileSystemResponse,
  GetFileSystemErrorResponse,
  GetFileSystemResponse,
  DeleteEntriesRequestConfig,
  GetEntriesResponseBody,
  GetEntriesRequestConfig,
  GetThreadsBody,
} from "../../endpoints"
import { Formatter, FormatterFactory } from "../../formatter"

export class PureStrategy extends BaseDevice {
  #formatter: Formatter = FormatterFactory.create()

  constructor(path: string, public deviceType: DeviceType) {
    super(path, deviceType)
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
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
    body: GetFileListBody
  }): Promise<Response<GetFileListResponseBody>>
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
    endpoint: Endpoint.Messages
    method: Method.Post
    body: PostMessagesBody
  }): Promise<Response<PostMessagesResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: PutMessageBody
  }): Promise<Response>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Delete
    body: GetThreadsBody
  }): Promise<Response>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetTemplateBody
  }): Promise<Response<GetTemplateResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Post
    body: PostTemplateBody
  }): Promise<Response<PostTemplateResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: PutTemplateBody
  }): Promise<Response>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Delete
    body: DeleteTemplateBody
  }): Promise<Response>
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
  public request(config: {
    endpoint: Endpoint.Update
    method: Method.Post
    body: {
      update: boolean
      reboot: boolean
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any>
  public request(
    config: GetFileSystemDirectoryRequestConfig
  ): Promise<GetFileSystemDirectoryResponse>
  public request(
    config: GetFileSystemRequestConfig
  ): Promise<GetFileSystemResponse | GetFileSystemErrorResponse>
  public request(
    config: DownloadFileSystemRequestConfig
  ): Promise<DownloadFileSystemResponse | DownloadFileSystemErrorResponse>
  public request(
    config: PutFileSystemRequestConfig
  ): Promise<PutFileSystemResponse | PutFileSystemErrorResponse>
  public request(
    config: SendFileSystemRequestConfig
  ): Promise<SendFileSystemResponse | SendFileSystemErrorResponse>
  public request(
    config: StartBackupRequestConfig
  ): Promise<Response<StartBackupResponseBody>>
  public request(
    config: GetBackupDeviceStatusRequestConfig
  ): Promise<Response<GetBackupDeviceStatusResponseBody>>
  public request(config: StartRestoreRequestConfig): Promise<Response>
  public request(
    config: GetRestoreDeviceStatusRequestConfig
  ): Promise<Response<GetRestoreDeviceStatusResponseBody>>
  public request(
    config: GetEntriesRequestConfig
  ): Promise<Response<GetEntriesResponseBody>>
  public request(config: DeleteEntriesRequestConfig): Promise<Response>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public request(config: RequestConfig<any>): Promise<Response<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    const response = await super.request(config)
    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createPureStrategy: CreateDeviceStrategy = (
  path: string,
  deviceType: DeviceType
) => new PureStrategy(path, deviceType)

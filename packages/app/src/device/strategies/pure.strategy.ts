/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import {
  Endpoint,
  Method,
  DeviceCommunicationEvent,
} from "App/device/constants"
import {
  GetPhoneLockTimeResponseBody,
  RequestConfig,
  Response,
  StartRestoreRequestConfig,
  RemoveFileSystemRequestConfig,
  GetSecurityRequestConfig,
  GetPhoneLockStatusRequestConfig,
  GetPhoneLockTimeRequestConfig,
  UnlockDeviceRequestConfig,
  GetDeviceInfoRequestConfig,
  GetDeviceInfoResponseBody,
  GetDeviceFilesRequestConfig,
  GetDeviceFilesResponseBody,
  GetMessagesRequestConfig,
  GetMessagesResponseBody,
  GetMessageRequestConfig,
  GetMessageResponseBody,
  GetThreadsRequestConfig,
  GetThreadsResponseBody,
  GetThreadRequestConfig,
  GetThreadResponseBody,
  CreateMessageRequestConfig,
  CreateMessageResponseBody,
  UpdateMessageRequestConfig,
  DeleteMessageRequestConfig,
  DeleteThreadRequestConfig,
  UpdateThreadReadUnreadStateRequestConfig,
  GetTemplateRequestConfig,
  GetTemplateResponseBody,
  GetTemplatesRequestConfig,
  GetTemplatesResponseBody,
  CreateTemplateRequestConfig,
  CreateTemplateResponseBody,
  UpdateTemplateRequestConfig,
  UpdateTemplateOrderRequestConfig,
  DeleteTemplateRequestConfig,
  GetContactsRequestConfig,
  GetContactsResponseBody,
  GetContactRequestConfig,
  GetContactResponseBody,
  CreateContactRequestConfig,
  CreateContactResponseBody,
  UpdateContactRequestConfig,
  UpdateContactResponseBody,
  DeleteContactRequestConfig,
  DeleteContactResponseBody,
  StartDeviceUpdateRequestBody,
  GetFileSystemDirectoryRequestConfig,
  GetFileSystemDirectoryResponseBody,
  GetFileSystemRequestConfig,
  GetFileSystemResponseBody,
  DownloadFileSystemRequestConfig,
  DownloadFileSystemResponseBody,
  SendFileSystemRequestConfig,
  SendFileSystemResponseBody,
  PutFileSystemRequestConfig,
  PutFileSystemResponseBody,
  StartBackupRequestConfig,
  StartBackupResponseBody,
  GetBackupDeviceStatusRequestConfig,
  GetBackupDeviceStatusResponseBody,
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
  GetEntriesRequestConfig,
  GetEntriesResponseBody,
  DeleteEntriesRequestConfig,
} from "App/device/types/mudita-os"
import { RequestResponse } from "App/core/types/request-response.interface"
import { BaseAdapter } from "App/device/modules/base.adapter"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"

export class PureStrategy implements DeviceStrategy {
  constructor(private adapter: BaseAdapter) {}

  public async connect(): Promise<
    ResultObject<Response<GetDeviceInfoResponseBody>>
  > {
    const response = await this.adapter.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    return response
  }

  public async disconnect(): Promise<ResultObject<boolean>> {
    return this.adapter.disconnect()
  }

  public async request(
    config: GetSecurityRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetPhoneLockStatusRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetPhoneLockTimeRequestConfig
  ): Promise<ResultObject<RequestResponse<GetPhoneLockTimeResponseBody>>>
  public async request(
    config: UnlockDeviceRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetDeviceInfoRequestConfig
  ): Promise<ResultObject<RequestResponse<GetDeviceInfoResponseBody>>>
  public async request(
    config: GetDeviceFilesRequestConfig
  ): Promise<ResultObject<RequestResponse<GetDeviceFilesResponseBody>>>

  public async request(
    config: GetMessagesRequestConfig
  ): Promise<ResultObject<RequestResponse<GetMessagesResponseBody>>>
  public async request(
    config: GetMessageRequestConfig
  ): Promise<ResultObject<RequestResponse<GetMessageResponseBody>>>
  public async request(
    config: GetThreadsRequestConfig
  ): Promise<ResultObject<RequestResponse<GetThreadsResponseBody>>>
  public async request(
    config: GetThreadRequestConfig
  ): Promise<ResultObject<RequestResponse<GetThreadResponseBody>>>
  public async request(
    config: CreateMessageRequestConfig
  ): Promise<ResultObject<RequestResponse<CreateMessageResponseBody>>>
  public async request(
    config: UpdateMessageRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: DeleteThreadRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: DeleteMessageRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: UpdateThreadReadUnreadStateRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetTemplatesRequestConfig
  ): Promise<ResultObject<RequestResponse<GetTemplatesResponseBody>>>
  public async request(
    config: GetTemplateRequestConfig
  ): Promise<ResultObject<RequestResponse<GetTemplateResponseBody>>>
  public async request(
    config: CreateTemplateRequestConfig
  ): Promise<ResultObject<RequestResponse<CreateTemplateResponseBody>>>
  public async request(
    config: UpdateTemplateRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: UpdateTemplateOrderRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: DeleteTemplateRequestConfig
  ): Promise<ResultObject<RequestResponse>>

  public async request(
    config: GetContactsRequestConfig
  ): Promise<ResultObject<RequestResponse<GetContactsResponseBody>>>
  public async request(
    config: GetContactRequestConfig
  ): Promise<ResultObject<RequestResponse<GetContactResponseBody>>>
  public async request(
    config: CreateContactRequestConfig
  ): Promise<ResultObject<RequestResponse<CreateContactResponseBody>>>
  public async request(
    config: UpdateContactRequestConfig
  ): Promise<ResultObject<RequestResponse<UpdateContactResponseBody>>>
  public async request(
    config: DeleteContactRequestConfig
  ): Promise<ResultObject<RequestResponse<DeleteContactResponseBody>>>

  public async request(
    config: StartDeviceUpdateRequestBody
  ): Promise<ResultObject<RequestResponse>>

  public async request(
    config: GetFileSystemDirectoryRequestConfig
  ): Promise<ResultObject<RequestResponse<GetFileSystemDirectoryResponseBody>>>
  public async request(
    config: GetFileSystemRequestConfig
  ): Promise<ResultObject<RequestResponse<GetFileSystemResponseBody>>>
  public async request(
    config: DownloadFileSystemRequestConfig
  ): Promise<ResultObject<RequestResponse<DownloadFileSystemResponseBody>>>
  public async request(
    config: SendFileSystemRequestConfig
  ): Promise<ResultObject<RequestResponse<SendFileSystemResponseBody>>>
  public async request(
    config: PutFileSystemRequestConfig
  ): Promise<ResultObject<RequestResponse<PutFileSystemResponseBody>>>

  public async request(
    config: StartBackupRequestConfig
  ): Promise<ResultObject<RequestResponse<StartBackupResponseBody>>>
  public async request(
    config: GetBackupDeviceStatusRequestConfig
  ): Promise<ResultObject<RequestResponse<GetBackupDeviceStatusResponseBody>>>
  public async request(
    config: StartRestoreRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetRestoreDeviceStatusRequestConfig
  ): Promise<ResultObject<RequestResponse<GetRestoreDeviceStatusResponseBody>>>
  public async request(
    config: RemoveFileSystemRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  public async request(
    config: GetEntriesRequestConfig
  ): Promise<ResultObject<RequestResponse<GetEntriesResponseBody>>>
  public async request(
    config: DeleteEntriesRequestConfig
  ): Promise<ResultObject<RequestResponse>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<ResultObject<any>> {
    return this.adapter.request(config)
  }

  public on(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.adapter.on(eventName, listener)
  }

  public off(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.adapter.off(eventName, listener)
  }
}

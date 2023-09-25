/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  BackupCategory,
  Method,
  Endpoint,
  BackupState,
  BatteryState,
  SIM,
  SignalStrength,
  Tray,
  AccessTechnology,
  NetworkStatus,
  CaseColor,
  DiagnosticsFileList,
  PhoneLockCategory,
  MessageType,
  MessagesCategory,
  OutboxEntryType,
  OutboxCategory,
  OutboxEntryChange,
  RestoreState,
} from "App/device/constants"
import { RequestConfig } from "App/device/types/mudita-os/request-config.type"
import { PaginationBody } from "App/device/types/mudita-os/pagination.type"
import { OnboardingState } from "App/device/constants/onboarding-state.constant"

// Backup types
export interface StartBackupRequestConfig
  extends RequestConfig<{
    category: BackupCategory
  }> {
  endpoint: Endpoint.Backup
  method: Method.Post
}

export interface StartBackupResponseBody {
  id: string
}

export interface GetBackupDeviceStatusRequestConfigBody {
  id: string
  category?: BackupCategory
}

export interface GetBackupDeviceStatusRequestConfig
  extends RequestConfig<GetBackupDeviceStatusRequestConfigBody> {
  endpoint: Endpoint.Backup
  method: Method.Get
}

export interface GetBackupDeviceStatusResponseBody {
  id: string
  state: BackupState
}

// Contact types
export interface Contact {
  address: string
  altName: string
  blocked: boolean
  favourite: boolean
  id: number
  numbers: string[]
  priName: string
  email: string
}

export type NewContact = Omit<Contact, "id">

export interface GetContactsRequestConfig extends RequestConfig {
  endpoint: Endpoint.Contacts
  method: Method.Get
}

export interface GetContactsResponseBody {
  entries: Contact[]
  totalCount: number
}

export interface GetContactRequestConfig
  extends RequestConfig<{
    id: number
  }> {
  endpoint: Endpoint.Contacts
  method: Method.Get
}

export type GetContactResponseBody = Contact

export interface CreateContactRequestConfig extends RequestConfig<Contact> {
  endpoint: Endpoint.Contacts
  method: Method.Post
}

export type CreateContactResponseBody = Contact

export interface CreateContactErrorResponseBody {
  duplicateNumbers: string[]
}

export interface UpdateContactRequestConfig extends RequestConfig<Contact> {
  endpoint: Endpoint.Contacts
  method: Method.Put
}

export type UpdateContactResponseBody = Contact

export interface DeleteContactRequestConfig
  extends RequestConfig<{ id: number }> {
  endpoint: Endpoint.Contacts
  method: Method.Delete
}

export type DeleteContactResponseBody = string

// DeviceInfo types
export interface DeviceInfo {
  // backupLocation is a deprecated field after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
  backupLocation?: string
  batteryLevel: string
  batteryState: BatteryState
  currentRTCTime: string
  systemReservedSpace: string
  usedUserSpace: string
  deviceSpaceTotal: string
  gitBranch: string
  gitRevision: string
  version: string
  selectedSim: SIM
  signalStrength: SignalStrength
  networkOperatorName: string
  trayState: Tray
  accessTechnology: AccessTechnology
  networkStatus: NetworkStatus
  serialNumber: string
  caseColour: CaseColor
  deviceToken?: string
  backupFilePath: string
  updateFilePath?: string
  syncFilePath: string
  recoveryStatusFilePath: string
  onboardingState: OnboardingState
}

export interface NotSupportedDeviceInfo {
  fsFree: string
  fsFreePercent: string
  fsTotal: string
}

export interface GetDeviceInfoRequestConfig extends RequestConfig {
  endpoint: Endpoint.DeviceInfo
  method: Method.Get
}

export type GetDeviceInfoResponseBody = DeviceInfo

export interface GetDeviceFilesRequestConfig
  extends RequestConfig<{
    fileList: DiagnosticsFileList
  }> {
  endpoint: Endpoint.DeviceInfo
  method: Method.Get
}

export interface GetDeviceFilesResponseBody {
  files: string[]
}

// Security types
export interface GetPhoneLockStatusRequestConfig
  extends RequestConfig<{
    category: PhoneLockCategory.Status
  }> {
  endpoint: Endpoint.Security
  method: Method.Get
}

export interface GetPhoneLockTimeRequestConfig
  extends RequestConfig<{
    category: PhoneLockCategory.Time
  }> {
  endpoint: Endpoint.Security
  method: Method.Get
}

export interface GetSecurityRequestConfig {
  endpoint: Endpoint.Security
  method: Method.Get
}

export interface GetPhoneLockTimeResponseBody {
  phoneLockTime?: number
  timeLeftToNextAttempt?: number
}

export interface UnlockDeviceRequestConfig
  extends RequestConfig<{
    phoneLockCode: string
  }> {
  endpoint: Endpoint.Security
  method: Method.Put
}

// Files system types
export interface PutFileSystemRequestConfig
  extends RequestConfig<{
    fileName: string
    fileSize: number
    fileCrc32: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Put
}

export interface PutFileSystemResponseBody {
  txID: string
  chunkSize: number
}

export interface PutFileSystemErrorResponseBody {
  reason: string
}

export interface SendFileSystemRequestConfig
  extends RequestConfig<{
    txID: string
    chunkNo: number
    data: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Put
}

export interface SendFileSystemResponseBody {
  txID: string
  chunkNo: number
}

export interface SendFileSystemErrorResponseBody {
  txID: string
  reason: string
}

export interface GetFileSystemRequestConfig
  extends RequestConfig<{
    fileName: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Get
}

export interface GetFileSystemDirectoryRequestConfig
  extends RequestConfig<{
    listDir: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Get
}

export type GetFileSystemDirectoryResponseBody = Record<
  string,
  { path: string; fileSize: number }[]
>

export interface GetFileSystemResponseBody {
  rxID: string
  fileSize: number
  chunkSize: number
  fileCrc32: string
}

export interface GetFileSystemErrorResponseBody {
  reason: string
}

export interface DownloadFileSystemRequestConfig
  extends RequestConfig<{
    rxID: string
    chunkNo: number
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Get
}

export interface DownloadFileSystemResponseBody {
  rxID: string
  chunkNo: number
  fileCrc32?: string
  data: string
}

export interface DownloadFileSystemErrorResponseBody {
  rxID: string
  reason: string
}

export interface RemoveFileSystemRequestConfig
  extends RequestConfig<{
    removeFile: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Delete
}

// Message types
export interface Message {
  contactID: number
  messageBody: string
  messageID: number
  messageType: MessageType
  createdAt: number
  threadID: number
  number: string
}

export interface Thread {
  contactID: number
  isUnread: boolean
  lastUpdatedAt: number
  messageCount: number
  messageSnippet: string
  messageType: number
  number: string
  threadID: number
}

export interface PureTemplate {
  templateID: number
  lastUsedAt: number
  templateBody: string
  order?: number
}

export interface GetMessagesRequestConfig
  extends RequestConfig<
    {
      category: MessagesCategory.message
      threadID?: number
    } & Partial<PaginationBody>
  > {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export interface GetMessagesResponseBody {
  entries: Message[]
  totalCount: number
  nextPage?: PaginationBody
}

export interface GetThreadsRequestConfig
  extends RequestConfig<
    {
      category: MessagesCategory.thread
    } & Partial<PaginationBody>
  > {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export interface GetThreadsResponseBody {
  entries: Thread[]
  totalCount: number
  nextPage?: PaginationBody
}

export interface GetTemplatesRequestConfig
  extends RequestConfig<
    {
      category: MessagesCategory.template
    } & Partial<PaginationBody>
  > {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export interface GetTemplatesResponseBody {
  entries: PureTemplate[]
  totalCount: number
  nextPage?: PaginationBody
}

export interface GetMessageRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.message
    messageID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export type GetMessageResponseBody = Message

export interface GetThreadRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.thread
    threadID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export type GetThreadResponseBody = Thread

export interface GetTemplateRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.template
    templateID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Get
}

export type GetTemplateResponseBody = Message

export interface CreateMessageRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.message
    number: string
    messageBody: string
    messageType?: MessageType
  }> {
  endpoint: Endpoint.Messages
  method: Method.Post
}

export type CreateMessageResponseBody = Message

export interface CreateTemplateRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.template
    templateBody: string
    order?: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Post
}

export interface CreateTemplateResponseBody {
  templateID: number
}

export interface UpdateMessageRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.message
    messageBody: string
    messageID: number
    messageType: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Put
}

export interface UpdateThreadReadUnreadStateRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.thread
    threadID: number
    isUnread: boolean
  }> {
  endpoint: Endpoint.Messages
  method: Method.Put
}

export interface UpdateTemplateRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.template
    templateID: number
    templateBody: string
  }> {
  endpoint: Endpoint.Messages
  method: Method.Put
}

export interface UpdateTemplateOrderRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.template
    templateID: number
    order?: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Put
}

export interface DeleteMessageRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.message
    messageID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Delete
}

export interface DeleteThreadRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.thread
    threadID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Delete
}

export interface DeleteTemplateRequestConfig
  extends RequestConfig<{
    category: MessagesCategory.template
    templateID: number
  }> {
  endpoint: Endpoint.Messages
  method: Method.Delete
}

// Outbox types
export interface OutboxEntry {
  uid: number
  type: OutboxEntryType
  change: OutboxEntryChange
  record_id: number
}

export interface GetEntriesRequestConfig
  extends RequestConfig<{
    category: OutboxCategory
  }> {
  endpoint: Endpoint.Outbox
  method: Method.Get
}

export interface GetEntriesResponseBody {
  entries: OutboxEntry[]
}

export interface DeleteEntriesRequestConfig
  extends RequestConfig<{
    entries: number[]
  }> {
  endpoint: Endpoint.Outbox
  method: Method.Delete
}

// Restore types
export interface StartRestoreRequestConfig
  extends RequestConfig<{
    restore: string
  }> {
  endpoint: Endpoint.Restore
  method: Method.Post
}

export interface GetRestoreDeviceStatusRequestConfig
  extends RequestConfig<{
    id: string
  }> {
  endpoint: Endpoint.Restore
  method: Method.Get
}

export interface GetRestoreDeviceStatusResponseBody {
  id: string
  state: RestoreState
}

// Update types
export interface StartDeviceUpdateRequestBody
  extends RequestConfig<{
    update: boolean
    reboot: boolean
  }> {
  endpoint: Endpoint.Update
  method: Method.Post
}

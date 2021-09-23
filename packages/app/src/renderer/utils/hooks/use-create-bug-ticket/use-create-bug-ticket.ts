/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
import getAppLogs from "Renderer/requests/get-app-logs.request"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import DeviceResponse from "Backend/adapters/device-response.interface"
import createFreshdeskTicket, {
  FreshdeskTicketData,
} from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import useCreateBugTicketBuilder, {
  attachedFileName,
} from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import archiveFiles from "Renderer/requests/archive-files.request"
import { ArchiveFilesData } from "App/main/functions/register-archive-files-listener"
import { DeviceFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"

export const files = [
  {
    name: attachedFileName,
  },
]

export interface DependencyUseCreateBugTicket {
  getAppLogs: () => Promise<string>
  archiveFiles: (data: ArchiveFilesData) => Promise<Buffer | undefined>
  getDeviceLogFiles: (option?: DeviceFilesOption) => Promise<DeviceResponse<DeviceFile[]>>
  createFreshdeskTicket: (
    data: FreshdeskTicketData
  ) => Promise<AxiosResponse<unknown>>
}

export default useCreateBugTicketBuilder({
  getAppLogs,
  archiveFiles,
  getDeviceLogFiles,
  createFreshdeskTicket,
})

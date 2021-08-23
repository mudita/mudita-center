/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
import getAppPath from "App/main/utils/get-app-path"
import writeFile from "Renderer/requests/write-file.request"
import writeGzip from "Renderer/requests/write-gzip.request"
import rmdir from "Renderer/requests/rmdir.request"
import createFile from "Renderer/utils/create-file/create-file"
import getAppLogs from "Renderer/requests/get-app-logs.request"
import getDeviceLogs from "Renderer/requests/get-device-logs.request"
import { WriteData } from "App/main/functions/register-write-file-listener"
import DeviceResponse from "Backend/adapters/device-response.interface"
import createFreshdeskTicket, {
  FreshdeskTicketData,
} from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"
import useCreateBugTicketBuilder, {
  attachedFileName,
} from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import { WriteGzipData } from "App/main/functions/register-write-gzip-listener"
import { RmdirProps } from "App/main/functions/register-rmdir-listener"

export const files = [
  {
    name: attachedFileName,
  },
]

export interface DependencyUseCreateBugTicket {
  getAppPath: () => string
  writeFile: (data: WriteData) => Promise<boolean>
  writeGzip: (data: WriteGzipData) => Promise<boolean>
  getAppLogs: () => Promise<string>
  getDeviceLogs: () => Promise<DeviceResponse<string>>
  createFile: (filePath: string, options?: FilePropertyBag) => File
  rmdir: (props: RmdirProps) => Promise<boolean>
  createFreshdeskTicket: (
    data: FreshdeskTicketData
  ) => Promise<AxiosResponse<unknown>>
}

export default useCreateBugTicketBuilder({
  getAppPath,
  writeFile,
  writeGzip,
  createFile,
  rmdir,
  getAppLogs,
  getDeviceLogs,
  createFreshdeskTicket,
})

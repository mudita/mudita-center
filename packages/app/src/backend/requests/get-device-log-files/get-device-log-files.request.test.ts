/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetDeviceLogFiles from "Backend/requests/get-device-log-files/get-device-log-files.request"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import MuditaDeviceManager, {
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
} from "@mudita/pure"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import DeviceFileSystemService from "Backend/device-file-system-service/device-file-system-service"

jest.mock("Backend/device-service")

test("GetDeviceLogs request works properly", (done) => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestConfig | DownloadFileSystemRequestConfig
      ) => {
        if (
          (config as GetFileSystemRequestConfig).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              rxID: "1",
              fileSize: 1,
              chunkSize: 1,
              fileCrc32: "265B86C6",
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: "SGVsbG8sIFdvcmxk",
            },
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)
  const purePhone = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService
  )

  registerGetDeviceLogFiles({
    purePhone,
  } as unknown as Adapters)
  const [promise] = (ipcMain as any)._flush(IpcRequest.GetDeviceLogFiles)
  promise.then((result: DeviceResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "data": "Hello, World",
      "status": "ok",
    }
  `)
    done()
  })
})

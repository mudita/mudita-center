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
import DeviceFileSystemService, { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"

jest.mock("Backend/device-service")
jest.mock(
  "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
)

test("GetDeviceLogs request works properly", (done) => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
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
  ;((DeviceFileDiagnosticService as unknown) as jest.Mock).mockImplementation(
    () => {
      return {
        getAllDiagnosticFileList: () => {
          return {
            status: DeviceResponseStatus.Ok,
            data: ["/sys/user/logs/MuditaOS.log"],
          }
        },
      }
    }
  )
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystemService = new DeviceFileSystemService(deviceService)
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )
  const purePhone = createPurePhoneAdapter(
    deviceService,
    deviceFileSystemService,
    deviceFileDiagnosticService
  )

  registerGetDeviceLogFiles(({
    purePhone,
  } as unknown) as Adapters)
  const [promise] = (ipcMain as any)._flush(IpcRequest.GetDeviceLogFiles)
  promise.then((result: DeviceResponse<DeviceFile[]>) => {
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Array [
          Object {
            "data": "Hello, World",
            "name": "MuditaOS.log",
          },
        ],
        "status": "ok",
      }
    `)
    done()
  })
})

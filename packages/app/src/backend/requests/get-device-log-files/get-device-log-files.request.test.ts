/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetDeviceLogFiles from "Backend/requests/get-device-log-files/get-device-log-files.request"
import DeviceService from "Backend/device-service"
import MuditaDeviceManager, {
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
} from "@mudita/pure"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import createDeviceFileSystemAdapter from "Backend/adapters/device-file-system/device-file-system.adapter"
import { DeviceBaseInfo } from "Backend/adapters/device-base-info/device-base-info.adapter"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("Backend/device-service")
jest.mock(
  "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
)

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
            status: RequestResponseStatus.Ok,
            data: {
              rxID: "1",
              fileSize: 1,
              chunkSize: 1,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestConfig).body?.chunkNo === 1
        ) {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              data: "SGVsbG8sIFdvcmxk",
              fileCrc32: "265B86C6",
            },
          }
        } else {
          return {
            status: RequestResponseStatus.Error,
          }
        }
      },
    }
  })
  ;(DeviceFileDiagnosticService as unknown as jest.Mock).mockImplementation(
    () => {
      return {
        getDiagnosticFileList: () => {
          return {
            status: RequestResponseStatus.Ok,
            data: {
              files: ["/sys/user/logs/MuditaOS.log"],
            },
          }
        },
      }
    }
  )
  const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
  const deviceFileSystem = createDeviceFileSystemAdapter(deviceService)
  const deviceBaseInfo = new DeviceBaseInfo(deviceService)
  const deviceFileDiagnosticService = new DeviceFileDiagnosticService(
    deviceService
  )
  const purePhone = createPurePhoneAdapter(
    deviceService,
    deviceBaseInfo,
    deviceFileSystem,
    deviceFileDiagnosticService
  )

  registerGetDeviceLogFiles({
    purePhone,
  } as unknown as Adapters)
  const [promise] = (ipcMain as any)._flush(IpcRequest.GetDeviceLogFiles)
  promise.then((result: RequestResponse<DeviceFile[]>) => {
    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Array [
          Object {
            "data": Object {
              "data": Array [
                72,
                101,
                108,
                108,
                111,
                44,
                32,
                87,
                111,
                114,
                108,
                100,
              ],
              "type": "Buffer",
            },
            "name": "MuditaOS.log",
          },
        ],
        "status": "ok",
      }
    `)
    done()
  })
})

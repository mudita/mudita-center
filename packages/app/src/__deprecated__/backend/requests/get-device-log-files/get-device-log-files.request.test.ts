/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import registerGetDeviceLogFiles from "App/__deprecated__/backend/requests/get-device-log-files/get-device-log-files.request"
import DeviceService from "App/__deprecated__/backend/device-service"
import MuditaDeviceManager from "@mudita/pure"
import {
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
} from "App/device/types/mudita-os"
import createPurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.adapter"
import { DeviceFile } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceFileDiagnosticService from "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
import createDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import { DeviceBaseInfo } from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/backend/device-service")
jest.mock(
  "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [promise] = (ipcMain as any)._flush(IpcRequest.GetDeviceLogFiles)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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

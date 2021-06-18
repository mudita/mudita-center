/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetDeviceLogs from "Backend/requests/get-device-logs/get-device-logs.request"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import PureDeviceManager, {
  DownloadFileSystemRequestPayload,
  GetFileSystemRequestPayload,
} from "@mudita/pure"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"

jest.mock("Backend/device-service")

test("GetDeviceLogs request works properly", (done) => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: (
        config: GetFileSystemRequestPayload | DownloadFileSystemRequestPayload
      ) => {
        if (
          (config as GetFileSystemRequestPayload).body?.fileName !== undefined
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: { rxID: "1", fileSize: 1, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
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
  const purePhone = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )

  registerGetDeviceLogs(({
    purePhone,
  } as unknown) as Adapters)
  const [promise] = (ipcMain as any)._flush(IpcRequest.GetDeviceLogs)
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import PureDeviceManager, {
  DownloadFileSystemRequestPayload,
  GetFileSystemRequestPayload,
} from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"

jest.mock("Backend/device-service")

test("unlock device returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.unlockDevice("3333")
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("get unlock device status returns properly value", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { status } = await purePhoneAdapter.getUnlockDeviceStatus()
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("import device error file handle properly chunks data", async () => {
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
            data: { rxID: "1", fileSize: 2, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: `W21haW5dICAgICBbMjAyMS0wNi0wOVQwNjowODoxMS43NDlaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTEuOTAwWl0gW2luZm9dOiAgUHJlcGFyaW5nIHRyYW5zbGF0aW9uIHVwZGF0ZSBmb3IgbGFuZ3VhZ2UgImVuLVVTIgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjE2NFpdIFtpbmZvXTogIFRyYW5zbGF0aW9uIGZvciBsYW5ndWFnZSAiZW4tVVMiIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTIuMjA5Wl0gW2luZm9dOiAgQ2hlY2tpbmcgZm9yIHVwZGF0ZQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk2MlpdIFtpbmZvXTogIFVwZGF0ZSBmb3IgdmVyc2lvbiAxMy4wLjAgaXMgbm90IGF2YWlsYWJsZSAobGF0ZXN0IHZlcnNpb246IDEzLjAuMCwgZG93bmdyYWRlIGlzIGRpc2FsbG93ZWQpLgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NC44MTdaXSBbaW5mb106ICBQcmVwYXJpbmcgdHJhbnNsYXRpb24gdXBkYXRlIGZvciBsYW5ndWFnZSAiZW4tVVMiClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuMTYxWl0gW2luZm9dOiAgVHJhbnNsYXRpb24gZm9yIGxhbmd1YWdlICJlbi1VUyIgYXBwbGllZCBzdWNjZXNzZnVsbHkKW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NS4xODlaXSBbaW5mb106ICBDaGVja2luZyBmb3IgdXBkYXRlClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuODgxWl0gW2luZm9dOiAgVXBkYXRlIGZvciB2ZXJzaW9uIDEzLjAuMCBpcyBub3QgYXZhaWxhYmxlIChsYXRlc3QgdmVyc2lvbjogMTMuMC4wLCBkb3duZ3JhZGUgaXMgZGlzYWxsb3dlZCkuClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjY5Wl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogbGlzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjcwWl0gW2luZm9dOiAgWwogIHsKICAgICJwYXRoIjogIi9kZXYvdHR5LkJsdWV0b290aC1JbmNvbWluZy1Qb3J0IgogIH0KXQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MFpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MVpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjoyMy42MDNaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MjMuNzAzWl0gW2luZm9dOiAgUHJlcGFy`,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 2
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: `aW5nIHRyYW5zbGF0aW9uIHVwZGF0ZSBmb3IgbGFuZ3VhZ2UgImVuLVVTIgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDExOjQ2OjIzLjk1OFpdIFtpbmZvXTogIFRyYW5zbGF0aW9uIGZvciBsYW5ndWFnZSAiZW4tVVMiIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MzQuNjcyWl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogbGlzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MzQuNjcyWl0gW2luZm9dOiAgWwogIHsKICAgICJwYXRoIjogIi9kZXYvdHR5LkJsdWV0b290aC1JbmNvbWluZy1Qb3J0IgogIH0sCiAgewogICAgInBhdGgiOiAiL2Rldi90dHkudXNibW9kZW0wMDAwMDAwMDAwMiIsCiAgICAibWFudWZhY3R1cmVyIjogIk11ZGl0YSIsCiAgICAic2VyaWFsTnVtYmVyIjogIjAwMDAwMDAwMDAiLAogICAgImxvY2F0aW9uSWQiOiAiMTQ0MDAwMDAiLAogICAgInZlbmRvcklkIjogIjA0NWUiLAogICAgInByb2R1Y3RJZCI6ICIwNjIyIgogIH0KXQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDExOjQ2OjM0LjY4MFpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGNvbm5lY3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDExOjQ2OjM0LjY4MFpdIFtpbmZvXTogIHsKICAic3RhdHVzIjogMjAwCn0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjozNC42ODNaXSBbaW5mb106ICA9PT09IHNlcmlhbCBwb3J0OiBjcmVhdGUgdmFsaWQgcmVxdWVzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MzQuNjgzWl0gW2luZm9dOiAgWwogIHsKICAgICJlbmRwb2ludCI6IDEzLAogICAgIm1ldGhvZCI6IDEsCiAgICAidXVpZCI6IDIzMjUKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjozNC42ODhaXSBbaW5mb106ICA9PT09IHNlcmlhbCBwb3J0OiBkYXRhIHJlY2VpdmVkID09PT0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjozNC42ODhaXSBbaW5mb106ICBbCiAgewogICAgImJvZHkiOiBudWxsLAogICAgImVuZHBvaW50IjogMTMsCiAgICAic3RhdHVzIjogNDAzLAogICAgInV1aWQiOiAyMzI1CiAgfQpdClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6NDQuNjg4Wl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogY3JlYXRlIHZhbGlkIHJlcXVlc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDExOjQ2OjQ0LjY4OFpdIFtpbmZvXTogIFsKICB7CiAgICAiZW5kcG9pbnQiOiAxMywKICAgICJtZXRob2QiOiAxLAogICAgInV1aWQiOiA1NzQzCiAgfQpdClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6NDQuNjkyWl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogZGF0YSByZWNlaXZlZCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6NDQuNjkzWl0gW2luZm9dOiAgWwogIHsKICAgICJib2R5IjogbnVsbCwKICAgICJlbmRwb2ludCI6IDEzLAogICAgInN0YXR1cyI6IDQwMywKICAgICJ1dWlkIjogNTc0MwogIH0K`,
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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const writeFileSyncSpy = jest.spyOn<any, any>(
    purePhoneAdapter,
    "writeFileSync"
  )
  const { status } = await purePhoneAdapter.importDeviceErrorFile(
    "error-fixture.txt"
  )
  expect(writeFileSyncSpy).toHaveBeenCalledTimes(1)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("import device error file handle properly chunks data if fileSize is less than chunkSize", async () => {
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
            data: { rxID: "1", fileSize: 0.5, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: `W21haW5dICAgICBbMjAyMS0wNi0wOVQwNjowODoxMS43NDlaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTEuOTAwWl0gW2luZm9dOiAgUHJlcGFyaW5nIHRyYW5zbGF0aW9uIHVwZGF0ZSBmb3IgbGFuZ3VhZ2UgImVuLVVTIgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjE2NFpdIFtpbmZvXTogIFRyYW5zbGF0aW9uIGZvciBsYW5ndWFnZSAiZW4tVVMiIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTIuMjA5Wl0gW2luZm9dOiAgQ2hlY2tpbmcgZm9yIHVwZGF0ZQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk2MlpdIFtpbmZvXTogIFVwZGF0ZSBmb3IgdmVyc2lvbiAxMy4wLjAgaXMgbm90IGF2YWlsYWJsZSAobGF0ZXN0IHZlcnNpb246IDEzLjAuMCwgZG93bmdyYWRlIGlzIGRpc2FsbG93ZWQpLgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NC44MTdaXSBbaW5mb106ICBQcmVwYXJpbmcgdHJhbnNsYXRpb24gdXBkYXRlIGZvciBsYW5ndWFnZSAiZW4tVVMiClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuMTYxWl0gW2luZm9dOiAgVHJhbnNsYXRpb24gZm9yIGxhbmd1YWdlICJlbi1VUyIgYXBwbGllZCBzdWNjZXNzZnVsbHkKW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NS4xODlaXSBbaW5mb106ICBDaGVja2luZyBmb3IgdXBkYXRlClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuODgxWl0gW2luZm9dOiAgVXBkYXRlIGZvciB2ZXJzaW9uIDEzLjAuMCBpcyBub3QgYXZhaWxhYmxlIChsYXRlc3QgdmVyc2lvbjogMTMuMC4wLCBkb3duZ3JhZGUgaXMgZGlzYWxsb3dlZCkuClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjY5Wl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogbGlzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjcwWl0gW2luZm9dOiAgWwogIHsKICAgICJwYXRoIjogIi9kZXYvdHR5LkJsdWV0b290aC1JbmNvbWluZy1Qb3J0IgogIH0KXQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MFpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MVpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjoyMy42MDNaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MjMuNzAzWl0gW2luZm9dOiAgUHJlcGFy`,
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
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const writeFileSyncSpy = jest.spyOn<any, any>(
    purePhoneAdapter,
    "writeFileSync"
  )
  const { status } = await purePhoneAdapter.importDeviceErrorFile(
    "error-fixture.txt"
  )
  expect(writeFileSyncSpy).toHaveBeenCalledTimes(1)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("import device error file return error when part of the chunks data is broken", async () => {
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
            data: { rxID: "1", fileSize: 2, chunkSize: 1 },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 1
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: {
              data: `W21haW5dICAgICBbMjAyMS0wNi0wOVQwNjowODoxMS43NDlaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTEuOTAwWl0gW2luZm9dOiAgUHJlcGFyaW5nIHRyYW5zbGF0aW9uIHVwZGF0ZSBmb3IgbGFuZ3VhZ2UgImVuLVVTIgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjE2NFpdIFtpbmZvXTogIFRyYW5zbGF0aW9uIGZvciBsYW5ndWFnZSAiZW4tVVMiIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDY6MDg6MTIuMjA5Wl0gW2luZm9dOiAgQ2hlY2tpbmcgZm9yIHVwZGF0ZQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk2MlpdIFtpbmZvXTogIFVwZGF0ZSBmb3IgdmVyc2lvbiAxMy4wLjAgaXMgbm90IGF2YWlsYWJsZSAobGF0ZXN0IHZlcnNpb246IDEzLjAuMCwgZG93bmdyYWRlIGlzIGRpc2FsbG93ZWQpLgpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA2OjA4OjEyLjk5MlpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NC44MTdaXSBbaW5mb106ICBQcmVwYXJpbmcgdHJhbnNsYXRpb24gdXBkYXRlIGZvciBsYW5ndWFnZSAiZW4tVVMiClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuMTYxWl0gW2luZm9dOiAgVHJhbnNsYXRpb24gZm9yIGxhbmd1YWdlICJlbi1VUyIgYXBwbGllZCBzdWNjZXNzZnVsbHkKW21haW5dICAgICBbMjAyMS0wNi0wOVQwNzo1NDo1NS4xODlaXSBbaW5mb106ICBDaGVja2luZyBmb3IgdXBkYXRlClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTUuODgxWl0gW2luZm9dOiAgVXBkYXRlIGZvciB2ZXJzaW9uIDEzLjAuMCBpcyBub3QgYXZhaWxhYmxlIChsYXRlc3QgdmVyc2lvbjogMTMuMC4wLCBkb3duZ3JhZGUgaXMgZGlzYWxsb3dlZCkuClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjY5Wl0gW2luZm9dOiAgPT09PSBzZXJpYWwgcG9ydDogbGlzdCA9PT09ClttYWluXSAgICAgWzIwMjEtMDYtMDlUMDc6NTQ6NTYuMjcwWl0gW2luZm9dOiAgWwogIHsKICAgICJwYXRoIjogIi9kZXYvdHR5LkJsdWV0b290aC1JbmNvbWluZy1Qb3J0IgogIH0KXQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MFpdIFtpbmZvXTogID09PT0gc2VyaWFsIHBvcnQ6IGxpc3QgPT09PQpbbWFpbl0gICAgIFsyMDIxLTA2LTA5VDA3OjU0OjU2LjI3MVpdIFtpbmZvXTogIFsKICB7CiAgICAicGF0aCI6ICIvZGV2L3R0eS5CbHVldG9vdGgtSW5jb21pbmctUG9ydCIKICB9Cl0KW21haW5dICAgICBbMjAyMS0wNi0wOVQxMTo0NjoyMy42MDNaXSBbaW5mb106ICBTdGFydGluZyB0aGUgYXBwClttYWluXSAgICAgWzIwMjEtMDYtMDlUMTE6NDY6MjMuNzAzWl0gW2luZm9dOiAgUHJlcGFy`,
            },
          }
        } else if (
          (config as DownloadFileSystemRequestPayload).body?.chunkNo === 2
        ) {
          return {
            status: DeviceResponseStatus.Ok,
            data: undefined,
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
          }
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const writeFileSyncSpy = jest.spyOn<any, any>(
    purePhoneAdapter,
    "writeFileSync"
  )
  const { status } = await purePhoneAdapter.importDeviceErrorFile(
    "error-fixture.txt"
  )
  expect(writeFileSyncSpy).not.toHaveBeenCalledTimes(1)
  expect(status).toEqual(DeviceResponseStatus.Error)
})

test("import device error file returns error properly", async () => {
  ;((DeviceService as unknown) as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Error,
        }
      },
    }
  })
  const purePhoneAdapter = createPurePhoneAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const writeFileSyncSpy = jest.spyOn<any, any>(
    purePhoneAdapter,
    "writeFileSync"
  )
  const { status } = await purePhoneAdapter.importDeviceErrorFile(
    "error-fixture.txt"
  )
  expect(writeFileSyncSpy).not.toHaveBeenCalledTimes(1)
  expect(status).toEqual(DeviceResponseStatus.Error)
})

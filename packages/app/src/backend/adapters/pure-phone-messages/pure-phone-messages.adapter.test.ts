/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureDeviceManager, { Thread as PureThread } from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import DeviceService from "Backend/device-service"
import { Thread } from "App/messages/store/messages.interface"

const mockPureData: PureThread[] = [
  {
    contactID: 1,
    isUnread: true,
    lastUpdatedAt: 1617089558,
    messageCount: 1,
    messageSnippet:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    messageType: 1,
    numberID: 1,
    threadID: 1,
  },
  {
    contactID: 1,
    isUnread: true,
    lastUpdatedAt: 1615089558,
    messageCount: 1,
    messageSnippet:
      "Et beatae dicta ut consequatur aut. Consequuntur odio voluptas sed eligendi repudiandae quo amet.",
    messageType: 2,
    numberID: 1,
    threadID: 2,
  },
]

const threads: Thread[] = [
  {
    id: "1",
    contactId: "1",
    lastUpdatedAt: new Date(1617089558),
    messageSnippet:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    unread: true,
  },
  {
    id: "2",
    contactId: "1",
    lastUpdatedAt: new Date(1615089558),
    messageSnippet:
      "Et beatae dicta ut consequatur aut. Consequuntur odio voluptas sed eligendi repudiandae quo amet.",
    unread: true,
  },
]

jest.mock("Backend/device-service")

test("threads are returned properly", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: { entries: mockPureData, totalCount: mockPureData.length },
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const { data = [], status } = await purePhoneMessagesAdapter.getThreads()
  expect(data).toMatchObject(threads)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("threads are returned properly even though API is paginated", async () => {
  let requestCount = 0
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        if (requestCount === 1) {
          return {
            data: { entries: [mockPureData[1]], totalCount: 2 },
            status: DeviceResponseStatus.Ok,
          }
        } else {
          requestCount++

          return {
            data: {
              entries: [mockPureData[0]],
              totalCount: 2,
              nextPage: { limit: 1, offset: 1 },
            },
            status: DeviceResponseStatus.Ok,
          }
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const response = await purePhoneMessagesAdapter.getThreads()
  const { data, status } = response
  expect(data).toMatchObject(threads)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("error status is returned when data is undefined ", async () => {
  ;(DeviceService as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: undefined,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(PureDeviceManager, ipcMain)
  )
  const response = await purePhoneMessagesAdapter.getThreads()
  const { status } = response
  expect(status).toEqual(DeviceResponseStatus.Error)
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result } from "Core/core/builder"
import {
  EntryHandlersMapType,
  OutboxService,
} from "Core/outbox/services/outbox.service"
import { DeviceManager } from "Core/device-manager/services"
import { OutboxEntry } from "Core/device/types/mudita-os"
import {
  OutboxEntryChange,
  OutboxEntryType,
  Endpoint,
  Method,
} from "Core/device/constants"

const deviceManager = {
  device: {
    request: jest.fn().mockResolvedValue(Result.success({ entries: [] })),
  },
} as unknown as DeviceManager
const entryHandlersMap = {
  [OutboxEntryType.Contact]: {
    handleEntry: jest.fn(),
  },
} as unknown as EntryHandlersMapType
const subject = new OutboxService(deviceManager, entryHandlersMap)

const entriesMock: OutboxEntry[] = [
  {
    uid: 1,
    type: OutboxEntryType.Contact,
    change: OutboxEntryChange.Deleted,
    record_id: 1,
  },
]

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Contact Entry", () => {
    test("outbox `delete` request was called", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: entriesMock }))

      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("contact handler was called", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: entriesMock }))

      await subject.readOutboxEntries()
      expect(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        entryHandlersMap[OutboxEntryType.Contact].handleEntry
      ).toHaveBeenCalledWith(entriesMock[0])
    })
  })
})

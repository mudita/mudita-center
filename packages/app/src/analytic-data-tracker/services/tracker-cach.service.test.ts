/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TrackerCacheService } from "App/analytic-data-tracker/services/tracker-cache.service"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

describe("`TrackerCacheService`", () => {
  describe("`isEventUnique` method", () => {
    test("when event isn't stored in the cache then method returns true", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest.fn().mockReturnValue(Buffer.from(`{}`)),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(await subject.isEventUnique({ e_c: "Category 2" })).toBeTruthy()
    })

    test("when event hasn't got `e_c` property then method returns false", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest.fn().mockReturnValue(Buffer.from(`{}`)),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(await subject.isEventUnique({ e_a: "Action" })).toBeFalsy()
    })

    test("when event has the same structure like stored then methods returns false", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest
          .fn()
          .mockReturnValue(
            Buffer.from(
              `{"Category 1":{"e_c":"Category 1","e_a":"Action"},"Category 2":{"e_c":"Category 2","e_a":"Action"},"Category 3":{"e_c":"Category 3","e_a":"Action"}}`
            )
          ),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(
        await subject.isEventUnique({ e_c: "Category 2", e_a: "Action" })
      ).toBeFalsy()
    })

    test("when event hasn't the same structure like stored then method returns true", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest
          .fn()
          .mockReturnValue(
            Buffer.from(
              `{"Category 1":{"e_c":"Category 1","e_a":"Action"},"Category 2":{"e_c":"Category 2","e_a":"Action"},"Category 3":{"e_c":"Category 3","e_a":"Action"}}`
            )
          ),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(await subject.isEventUnique({ e_c: "Category 2" })).toBeTruthy()
    })
  })

  describe("`saveEvent` method", () => {
    test("returns undefined and call writeFile", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest.fn().mockReturnValue(Buffer.from(`{}`)),
        writeFile: jest.fn(),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(
        await subject.saveEvent({ e_c: "Category 2", e_a: "Action" })
      ).toBeUndefined()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        "track-cache.json",
        '{"Category 2":{"e_c":"Category 2","e_a":"Action"}}'
      )
    })

    test("process is ignored when `e_c` property isn't exist ", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest.fn().mockReturnValue(Buffer.from(`{}`)),
        writeFile: jest.fn(),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(await subject.saveEvent({ e_a: "Action" })).toBeUndefined()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(fileSystem.writeFile).not.toHaveBeenCalled()
    })

    test("replace the previous value stored in `e_c` key", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest
          .fn()
          .mockReturnValue(
            Buffer.from(
              `{"Category 1":{"e_c":"Category 1","e_a":"Action"},"Category 2":{"e_c":"Category 2","e_a":"Action"}}`
            )
          ),
        writeFile: jest.fn(),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(
        await subject.saveEvent({ e_c: "Category 2", e_a: "Action Replaced" })
      ).toBeUndefined()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(fileSystem.writeFile).toHaveBeenCalledWith(
        "track-cache.json",
        '{"Category 1":{"e_c":"Category 1","e_a":"Action"},"Category 2":{"e_c":"Category 2","e_a":"Action Replaced"}}'
      )
    })
  })
})

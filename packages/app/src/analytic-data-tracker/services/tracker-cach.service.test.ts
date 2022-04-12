/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TrackerCacheService } from "App/analytic-data-tracker/services/tracker-cache.service"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

describe("`TrackerCacheService`", () => {
  describe("`isEventUnique` method", () => {
    test("when event isn't stored in the cache methods returns false", () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest.fn().mockReturnValue(Buffer.from(``)),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(subject.isEventUnique({ event: "2" })).toBeTruthy()
    })

    test("when event is  stored in the cache methods returns true", () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        readFile: jest
          .fn()
          .mockReturnValue(
            Buffer.from(`{"event":"1"};{"event":"2"};{"event":"3"}`)
          ),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(subject.isEventUnique({ event: "2" })).toBeTruthy()
    })
  })

  describe("`saveEvent` method", () => {
    test("returns undefined and call appendFile", async () => {
      const fileSystem = {
        exists: jest.fn().mockReturnValue(true),
        appendFile: jest.fn(),
      } as unknown as FileSystemService

      const subject = new TrackerCacheService(fileSystem)
      expect(await subject.saveEvent({ event: "2" })).toBeUndefined()
      expect(fileSystem.appendFile).toHaveBeenCalledWith(
        "track-cache.txt",
        '{"event":"2"};'
      )
    })
  })
})

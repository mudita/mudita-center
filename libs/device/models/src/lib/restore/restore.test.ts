/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PreRestore,
  PreRestoreValidator,
  Restore,
  RestoreValidator,
} from "./restore"

const minimumPreRestore: PreRestore = {
  restoreId: 123,
  features: {
    messages: "dummy-text",
  },
}

describe("PreRestoreValidator", () => {
  it("should return success when correct config is validated", () => {
    const preRestore = { ...minimumPreRestore }
    const result = PreRestoreValidator(["messages"]).safeParse(preRestore)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const preRestore = {}
    const result = PreRestoreValidator([]).safeParse(preRestore)
    expect(result.success).toBeFalsy()
  })
  it.each(["restoreId", "features"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumPreRestore }
      delete dataToParse[fieldName]
      const result = PreRestoreValidator([]).safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it("should return success when correct features are passed", () => {
    const preRestore: PreRestore = {
      ...minimumPreRestore,
      features: { contacts: "dummy-string", messages: "dummy-string" },
    }

    const result = PreRestoreValidator(["contacts", "messages"]).safeParse(
      preRestore
    )
    expect(result.success).toBeTruthy()
  })
  it("should return fail when feature is missing", () => {
    const preRestore: PreRestore = {
      ...minimumPreRestore,
      features: { contacts: "dummy-string" },
    }
    const result = PreRestoreValidator(["contacts", "messages"]).safeParse(
      preRestore
    )
    expect(result.success).toBeFalsy()
  })
})

const minimumRestore: Omit<Restore, "progress"> = {
  rebootRequired: false,
}

describe("RestoreValidator", () => {
  it("should return success when correct config is validated", () => {
    const restore = { ...minimumRestore }
    const result = RestoreValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
  })
  it("should return success when object is empty", () => {
    const restore = {}
    const result = RestoreValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
    expect(result.success && result.data.progress).toBe(0)
  })
  it("should return success when message is passed", () => {
    const restore = {
      ...minimumRestore,
      message: "dummy-text",
    }

    const result = RestoreValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
  })
  describe("RestoreValidator.progress", () => {
    it.each([-1, 101])(
      "should return fail when progress is to %s",
      (progress) => {
        const restore = { progress }

        const result = RestoreValidator.safeParse(restore)
        expect(result.success).toBeFalsy()
      }
    )
    it.each([0, 99])(
      "should return success when progress is %s",
      (progress) => {
        const restore = { progress }

        const result = RestoreValidator.safeParse(restore)
        expect(result.success).toBeTruthy()
      }
    )
    it("should return success when progress is 100", () => {
      const restore = { rebootRequired: true, progress: 100 }

      const result = RestoreValidator.safeParse(restore)
      expect(result.success).toBeTruthy()
    })
  })
})

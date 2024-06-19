/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PreDataTransfer,
  PreDataTransferValidator,
  DataTransfer,
  DataTransferValidator,
} from "./data-transfer"

const minimumPreDataTransfer: PreDataTransfer = {
  dataTransferId: 123,
  domains: {
    ["contacts-v1"]: "dummy-text",
  },
}

describe("PreDataTransferValidator", () => {
  it("should return success when correct config is validated", () => {
    const preDataTransfer = { ...minimumPreDataTransfer }
    const result = PreDataTransferValidator(["contacts-v1"]).safeParse(
      preDataTransfer
    )
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const preDataTransfer = {}
    const result = PreDataTransferValidator([]).safeParse(preDataTransfer)
    expect(result.success).toBeFalsy()
  })
  it.each(["dataTransferId", "domains"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToParse: any = { ...minimumPreDataTransfer }
      delete dataToParse[fieldName]
      const result = PreDataTransferValidator([]).safeParse(dataToParse)
      expect(result.success).toBeFalsy()
    }
  )
  it("should return fail when domain is missing", () => {
    const preDataTransfer = {
      ...minimumPreDataTransfer,
      domains: {},
    }
    const result = PreDataTransferValidator(["contacts-v1"]).safeParse(
      preDataTransfer
    )
    expect(result.success).toBeFalsy()
  })
})

const minimumDataTransfer: Omit<DataTransfer, "progress"> = {
  rebootRequired: false,
}

describe("DataTransferValidator", () => {
  it("should return success when correct config is validated", () => {
    const restore = { ...minimumDataTransfer }
    const result = DataTransferValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
  })
  it("should return success when object is empty", () => {
    const restore = {}
    const result = DataTransferValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
    expect(result.success && result.data.progress).toBe(0)
  })
  it("should return success when message is passed", () => {
    const restore = {
      ...minimumDataTransfer,
      message: "dummy-text",
    }

    const result = DataTransferValidator.safeParse(restore)
    expect(result.success).toBeTruthy()
  })
  describe("DataTransferValidator.progress", () => {
    it.each([-1, 101])("should return fail when progress is %s", (progress) => {
      const restore = { progress }

      const result = DataTransferValidator.safeParse(restore)
      expect(result.success).toBeFalsy()
    })
    it.each([0, 99])(
      "should return success when progress is %s",
      (progress) => {
        const restore = { progress }

        const result = DataTransferValidator.safeParse(restore)
        expect(result.success).toBeTruthy()
      }
    )
    it("should return success when progress is 100", () => {
      const restore = { rebootRequired: true, progress: 100 }

      const result = DataTransferValidator.safeParse(restore)
      expect(result.success).toBeTruthy()
    })
  })
})

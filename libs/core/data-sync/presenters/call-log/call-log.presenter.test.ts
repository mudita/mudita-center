/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CallLogInput, CallLogObject } from "Core/data-sync/types"
import { CallLogPresenter } from "./call-log.presenter"

const presenter = new CallLogPresenter()

describe("CallLogPresenter - serializeToObject", () => {
  describe("basic serialization", () => {
    test("serializes a call log with all fields defined", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "1",
              "123456789",
              "+48123456789",
              "1633036800",
              "180",
              "1",
              "0",
              "2",
            ],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "1",
          phone: "+48123456789",
          callDate: 1633036800000,
          callDuration: 180,
          callType: 1,
          isNew: 1,
          presentation: 4, // Mapped from "2"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("handles multiple call log entries", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "2",
              "987654321",
              "+4987654321",
              "1633036800",
              "120",
              "2",
              "1",
              "0",
            ],
            ["3", "", "+49321321321", "1633036800", "90", "3", "0", "1"],
            ["4", "555555555", "", "1633036800", "60", "99", "0", "3"],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "2",
          phone: "+4987654321",
          callDate: 1633036800000,
          callDuration: 120,
          callType: 2,
          isNew: 0,
          presentation: 3, // Mapped from "0"
        },
        {
          id: "3",
          phone: "+49321321321",
          callDate: 1633036800000,
          callDuration: 90,
          callType: 3,
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "4",
          phone: "555555555",
          callDate: 1633036800000,
          callDuration: 60,
          callType: 8, // TYPE_OTHER for unknown types
          isNew: 1,
          presentation: 2, // Mapped from "3"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })

  describe("phone field", () => {
    test("uses `number` when `e164number` is empty", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            ["2", "987654321", "", "1633036800", "120", "2", "1", "1"],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "2",
          phone: "987654321",
          callDate: 1633036800000,
          callDuration: 120,
          callType: 2,
          isNew: 0,
          presentation: 1, // Mapped from "1"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("sets default `phone` as empty string when both `number` and `e164number` are missing", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [["5", "", "", "1633036800", "0", "1", "1", "2"]],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "5",
          phone: "",
          callDate: 1633036800000,
          callDuration: 0,
          callType: 1,
          isNew: 0,
          presentation: 4, // Mapped from "2"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })

  describe("isRead and isNew mapping", () => {
    test("correctly maps `isRead` to `isNew`", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "9",
              "111111111",
              "+48111111111",
              "1633036800",
              "60",
              "1",
              "0",
              "1",
            ],
            [
              "10",
              "222222222",
              "+48222222222",
              "1633036800",
              "120",
              "2",
              "1",
              "2",
            ],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "9",
          phone: "+48111111111",
          callDate: 1633036800000,
          callDuration: 60,
          callType: 1,
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "10",
          phone: "+48222222222",
          callDate: 1633036800000,
          callDuration: 120,
          callType: 2,
          isNew: 0,
          presentation: 4, // Mapped from "2"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("ignores invalid `isRead` values, defaults to 0", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "8",
              "222222222",
              "+48222222222",
              "1633036800",
              "15",
              "1",
              "invalid",
              "3",
            ],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "8",
          phone: "+48222222222",
          callDate: 1633036800000,
          callDuration: 15,
          callType: 1,
          isNew: 0,
          presentation: 2, // Mapped from "3"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })

  describe("call type mapping", () => {
    test("correctly maps all call types", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "11",
              "111111111",
              "+48111111111",
              "1633036800",
              "60",
              "0",
              "1",
              "2",
            ], // CT_NONE
            [
              "12",
              "222222222",
              "+48222222222",
              "1633036800",
              "120",
              "1",
              "0",
              "1",
            ], // CT_INCOMING
            [
              "13",
              "333333333",
              "+48333333333",
              "1633036800",
              "180",
              "2",
              "1",
              "3",
            ], // CT_OUTGOING
            [
              "14",
              "444444444",
              "+48444444444",
              "1633036800",
              "90",
              "3",
              "0",
              "1",
            ], // CT_MISSED
            [
              "15",
              "555555555",
              "+48555555555",
              "1633036800",
              "200",
              "4",
              "1",
              "0",
            ], // CT_VOICEMAIL
            [
              "16",
              "666666666",
              "+48666666666",
              "1633036800",
              "30",
              "5",
              "0",
              "2",
            ], // CT_REJECTED
            [
              "17",
              "777777777",
              "+48777777777",
              "1633036800",
              "45",
              "6",
              "1",
              "1",
            ], // CT_BLOCKED
            [
              "18",
              "888888888",
              "+48888888888",
              "1633036800",
              "75",
              "7",
              "0",
              "0",
            ], // CT_ANSW_EXT
            [
              "19",
              "999999999",
              "+48999999999",
              "1633036800",
              "150",
              "99",
              "1",
              "2",
            ], // Unknown type
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "11",
          phone: "+48111111111",
          callDate: 1633036800000,
          callDuration: 60,
          callType: 8, // CT_NONE maps to TYPE_OTHER
          isNew: 0,
          presentation: 4, // Mapped from "2"
        },
        {
          id: "12",
          phone: "+48222222222",
          callDate: 1633036800000,
          callDuration: 120,
          callType: 1, // CT_INCOMING
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "13",
          phone: "+48333333333",
          callDate: 1633036800000,
          callDuration: 180,
          callType: 2, // CT_OUTGOING
          isNew: 0,
          presentation: 2, // Mapped from "3"
        },
        {
          id: "14",
          phone: "+48444444444",
          callDate: 1633036800000,
          callDuration: 90,
          callType: 3, // CT_MISSED
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "15",
          phone: "+48555555555",
          callDate: 1633036800000,
          callDuration: 200,
          callType: 4, // CT_VOICEMAIL
          isNew: 0,
          presentation: 3, // Mapped from "0"
        },
        {
          id: "16",
          phone: "+48666666666",
          callDate: 1633036800000,
          callDuration: 30,
          callType: 5, // CT_REJECTED
          isNew: 1,
          presentation: 4, // Mapped from "2"
        },
        {
          id: "17",
          phone: "+48777777777",
          callDate: 1633036800000,
          callDuration: 45,
          callType: 6, // CT_BLOCKED
          isNew: 0,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "18",
          phone: "+48888888888",
          callDate: 1633036800000,
          callDuration: 75,
          callType: 7, // CT_ANSW_EXT
          isNew: 1,
          presentation: 3, // Mapped from "0"
        },
        {
          id: "19",
          phone: "+48999999999",
          callDate: 1633036800000,
          callDuration: 150,
          callType: 8, // Unknown type maps to TYPE_OTHER
          isNew: 0,
          presentation: 4, // Mapped from "2"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("sets default `callType` to 8 for unknown types", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "4",
              "555555555",
              "+49555555555",
              "1633036800",
              "60",
              "99",
              "0",
              "1",
            ],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "4",
          phone: "+49555555555",
          callDate: 1633036800000,
          callDuration: 60,
          callType: 8, // TYPE_OTHER for unknown types
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })

  describe("presentation type mapping", () => {
    test("correctly maps all presentation types", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "2",
              "987654321",
              "+4987654321",
              "1633036800",
              "120",
              "2",
              "1",
              "0",
            ],
            ["3", "", "+49321321321", "1633036800", "90", "3", "0", "1"],
            ["4", "555555555", "", "1633036800", "60", "99", "0", "3"],
            ["5", "666666666", "", "1633036800", "90", "1", "1", "4"],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "2",
          phone: "+4987654321",
          callDate: 1633036800000,
          callDuration: 120,
          callType: 2,
          isNew: 0,
          presentation: 3, // Mapped from "0"
        },
        {
          id: "3",
          phone: "+49321321321",
          callDate: 1633036800000,
          callDuration: 90,
          callType: 3,
          isNew: 1,
          presentation: 1, // Mapped from "1"
        },
        {
          id: "4",
          phone: "555555555",
          callDate: 1633036800000,
          callDuration: 60,
          callType: 8, // TYPE_OTHER for unknown types
          isNew: 1,
          presentation: 2, // Mapped from "3"
        },
        {
          id: "5",
          phone: "666666666",
          callDate: 1633036800000,
          callDuration: 90,
          callType: 1,
          isNew: 0,
          presentation: 3, // Defaults to "3" for unknown presentation "4"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("handles missing presentation values, defaults to `3`", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "6",
              "999999999",
              "+48999999999",
              "1633036800",
              "150",
              "3",
              "0",
              "",
            ], // presentation is empty
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "6",
          phone: "+48999999999",
          callDate: 1633036800000,
          callDuration: 150,
          callType: 3,
          isNew: 1,
          presentation: 3, // Defaults to 3 when presentation is missing or empty
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })

  describe("handling missing or invalid data", () => {
    test("sets `callDuration` to default value when duration is missing", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [
            [
              "2",
              "987654321",
              "+4987654321",
              "1633036800",
              "",
              "2",
              "1",
              "1",
            ],
          ],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "2",
          phone: "+4987654321",
          callDate: 1633036800000,
          callDuration: 0, // Default duration when missing
          callType: 2,
          isNew: 0,
          presentation: 1, // Mapped from "1"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("sets default `callDate` when `date` is missing", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [["3", "321321321", "+49321321321", "", "90", "3", "0", "2"]],
        },
      }

      const expected: CallLogObject[] = [
        {
          id: "3",
          phone: "+49321321321",
          callDate: 0, // Default when date is missing
          callDuration: 90,
          callType: 3,
          isNew: 1,
          presentation: 4, // Mapped from "2"
        },
      ]

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("returns an empty array when there are no call log values", () => {
      const callLogInput: CallLogInput = {
        calls: {
          columns: [
            "_id",
            "number",
            "e164number",
            "date",
            "duration",
            "type",
            "isRead",
            "presentation",
          ],
          values: [],
        },
      }

      const expected: CallLogObject[] = []

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })

    test("returns an empty array when `calls` is undefined", () => {
      const callLogInput: CallLogInput = {
        calls: undefined,
      }

      const expected: CallLogObject[] = []

      const result = presenter.serializeToObject(callLogInput)
      expect(result).toEqual(expected)
    })
  })
})

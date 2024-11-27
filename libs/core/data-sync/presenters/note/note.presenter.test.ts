/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NotePresenter } from "./note-presenter"
import { NoteInput } from "Core/data-sync/types"

const presenter = new NotePresenter()

describe("NotePresenter - serializeToObject", () => {
  describe("basic serialization", () => {
    test("serializes a note with all fields defined", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          values: [["1", "1633036800", "Sample note content"]],
        },
      }

      const expected = [
        {
          id: "1",
          content: "Sample note content",
          isPinned: false,
          createDate: 1633036800000,
          updateDate: 1633036800000,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles multiple note entries", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          values: [
            ["2", "1633036800", "Note 1"],
            ["3", "1633036801", "Note 2"],
          ],
        },
      }

      const expected = [
        {
          id: "2",
          content: "Note 1",
          isPinned: false,
          createDate: 1633036800000,
          updateDate: 1633036800000,
        },
        {
          id: "3",
          content: "Note 2",
          isPinned: false,
          createDate: 1633036801000,
          updateDate: 1633036801000,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })
  })

  describe("handling missing or invalid data", () => {
    test("sets default `createDate` & `updateDate` when `date` is missing", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          values: [["4", "", "Sample note without date"]],
        },
      }

      const expected = [
        {
          id: "4",
          content: "Sample note without date",
          isPinned: false,
          createDate: 0,
          updateDate: 0,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("sets default `content` when `snippet` is missing", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          values: [["5", "1633036802", ""]],
        },
      }

      const expected = [
        {
          id: "5",
          content: "",
          isPinned: false,
          createDate: 1633036802000,
          updateDate: 1633036802000,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("sets default values for all optional fields when data is missing", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          // @ts-ignore
          values: [["6", null, undefined]],
        },
      }

      const expected = [
        {
          id: "6",
          content: "",
          isPinned: false,
          createDate: 0,
          updateDate: 0,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })
  })

  describe("edge cases", () => {
    test("handles undefined input gracefully", () => {
      const input: NoteInput = {
        notes: undefined,
      }

      const expected: unknown[] = []

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles empty `values` array", () => {
      const input: NoteInput = {
        notes: {
          columns: ["_id", "date", "snippet"],
          values: [],
        },
      }

      const expected: unknown[] = []

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })
  })
})

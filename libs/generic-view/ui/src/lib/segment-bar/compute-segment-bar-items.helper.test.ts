/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  computeSegmentBarItems,
  SegmentBarItem,
} from "./compute-segment-bar-items.helper"

describe("Single segments", () => {
  test("handles a single segment without minWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 100, minWidth: 0 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "100.00%", left: "0.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles a single segment with minWidth smaller than containerWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 1, minWidth: 50 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "100.00%", left: "0.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles a single segment occupying the full containerWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 100, minWidth: 100 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "100.00%", left: "0.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles a single segment minWidth larger than proportional width", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 100, minWidth: 200 },
    ]

    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "100.00%", left: "0.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })
})

describe("Multiple segments - proportional allocation", () => {
  test("handles multiple segments without minWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 50, minWidth: 0 },
      { color: "#111", label: "Segment 2", value: 30, minWidth: 0 },
      { color: "#222", label: "Segment 3", value: 20, minWidth: 0 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "50.00%", left: "0.00%", zIndex: 3 },
      { ...segments[1], width: "30.00%", left: "50.00%", zIndex: 2 },
      { ...segments[2], width: "20.00%", left: "80.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })
})

describe("Multiple segments - with minWidth", () => {
  test("handles segments with minWidth smaller than proportional width", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 70, minWidth: 10 },
      { color: "#111", label: "Segment 2", value: 30, minWidth: 5 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "71.75%", left: "0.00%", zIndex: 2 },
      { ...segments[1], width: "30.75%", left: "69.25%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles segments with minWidth equal to containerWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 1, minWidth: 50 },
      { color: "#111", label: "Segment 2", value: 1, minWidth: 50 },
      { color: "#111", label: "Segment 2", value: 1, minWidth: 50 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], left: "0.00%", width: "50.00%", zIndex: 3 },
      { ...segments[1], left: "25.00%", width: "50.00%", zIndex: 2 },
      { ...segments[2], left: "50.00%", width: "50.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles segments with minWidth larger than proportional width", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 1, minWidth: 80 },
      { color: "#111", label: "Segment 2", value: 1, minWidth: 40 },
    ]

    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "80.00%", left: "0.00%", zIndex: 2 },
      { ...segments[1], width: "40.00%", left: "60.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles segments with minWidth exceeding containerWidth", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 1, minWidth: 80 },
      { color: "#111", label: "Segment 2", value: 1, minWidth: 80 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "70.00%", left: "0.00%", zIndex: 2 },
      { ...segments[1], width: "70.00%", left: "30.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })
})

describe("Edge cases", () => {
  test("ignores segments with value = 0", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 0, minWidth: 50 },
      { color: "#111", label: "Segment 2", value: 100, minWidth: 50 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[1], width: "100.00%", left: "0.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles an empty array of segments", () => {
    const segments: SegmentBarItem[] = []
    const result = computeSegmentBarItems(segments, 100)

    expect(result).toEqual([])
  })
})

describe("Advanced scenarios", () => {
  test("handles mix of minWidth and proportional allocation", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 30, minWidth: 30 },
      { color: "#111", label: "Segment 2", value: 20, minWidth: 10 },
      { color: "#222", label: "Segment 3", value: 50, minWidth: 10 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "33.00%", left: "0.00%", zIndex: 3 },
      { ...segments[1], width: "22.00%", left: "28.00%", zIndex: 2 },
      { ...segments[2], width: "55.00%", left: "45.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })

  test("handles a mix of overlap and proportional widths", () => {
    const segments: SegmentBarItem[] = [
      { color: "#000", label: "Segment 1", value: 40, minWidth: 20 },
      { color: "#111", label: "Segment 2", value: 40, minWidth: 20 },
      { color: "#222", label: "Segment 3", value: 20, minWidth: 20 },
    ]
    const result = computeSegmentBarItems(segments, 100)

    const expected = [
      { ...segments[0], width: "48.00%", left: "0.00%", zIndex: 3 },
      { ...segments[1], width: "48.00%", left: "38.00%", zIndex: 2 },
      { ...segments[2], width: "24.00%", left: "76.00%", zIndex: 1 },
    ]

    expect(result).toEqual(expected)
  })
})

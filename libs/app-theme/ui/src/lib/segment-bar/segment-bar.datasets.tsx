/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { ISegmentBarItem } from "./segment-bar.types"

export type SegmentCase = {
  description: string
  segments: ISegmentBarItem[]
  containerWidth: number
}

const segmentSets: SegmentCase[] = [
  {
    description: 'Design 1: Full usage, no "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 25, minWidth: 9.68 },
      { color: "#0E7490", label: "Segment 2", value: 50, minWidth: 9.68 },
      { color: "#A8DADC", label: "Segment 3", value: 24, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 4", value: 1, minWidth: 9.68 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 2: Partial usage with "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 34, minWidth: 9.68 },
      { color: "#0E7490", label: "Segment 2", value: 1, minWidth: 9.68 },
      { color: "#A8DADC", label: "Segment 3", value: 34, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 4", value: 1, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 30, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 3: Minimal usage with "free" space',
    segments: [
      { color: "#3B3F42", label: "Segment 1", value: 1, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 99, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 4: Small usage with "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 1, minWidth: 9.68 },
      { color: "#0E7490", label: "Segment 2", value: 1, minWidth: 9.68 },
      { color: "#A8DADC", label: "Segment 3", value: 1, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 4", value: 2, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 95, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 5: High usage with "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 1, minWidth: 9.68 },
      { color: "#0E7490", label: "Segment 2", value: 1, minWidth: 9.68 },
      { color: "#A8DADC", label: "Segment 3", value: 67, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 4", value: 1, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 30, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 6: Almost full usage with small "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 25, minWidth: 9.68 },
      { color: "#0E7490", label: "Segment 2", value: 25, minWidth: 9.68 },
      { color: "#A8DADC", label: "Segment 3", value: 25, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 4", value: 24, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 1, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: 'Design 7: Proportional small usage with "free" space',
    segments: [
      { color: "#E38577", label: "Segment 1", value: 1, minWidth: 9.68 },
      { color: "#3B3F42", label: "Segment 2", value: 1.2, minWidth: 9.68 },
      { color: "#D3D3D3", label: "Free", value: 95.8, minWidth: 4.84 },
    ],
    containerWidth: 100,
  },
  {
    description: "Single: One segment without minWidth",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 100, minWidth: 0 },
    ],
    containerWidth: 100,
  },
  {
    description:
      "Single: One segment with minWidth smaller than containerWidth",
    segments: [
      { color: "#0E7490", label: "Segment 1", value: 1, minWidth: 50 },
    ],
    containerWidth: 100,
  },
  {
    description: "Single: One segment occupying the full containerWidth",
    segments: [
      { color: "#A8DADC", label: "Segment 1", value: 100, minWidth: 100 },
    ],
    containerWidth: 100,
  },
  {
    description:
      "Single: One segment with minWidth larger than proportional width",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 100, minWidth: 200 },
    ],
    containerWidth: 100,
  },
  {
    description: "Multiple: Proportional allocation without minWidth",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 50, minWidth: 0 },
      { color: "#0E7490", label: "Segment 2", value: 30, minWidth: 0 },
      { color: "#A8DADC", label: "Segment 3", value: 20, minWidth: 0 },
    ],
    containerWidth: 100,
  },
  {
    description: "Multiple: MinWidth smaller than proportional width",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 70, minWidth: 10 },
      { color: "#0E7490", label: "Segment 2", value: 30, minWidth: 5 },
    ],
    containerWidth: 100,
  },
  {
    description: "Multiple: MinWidth equal to containerWidth",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 1, minWidth: 50 },
      { color: "#0E7490", label: "Segment 2", value: 1, minWidth: 50 },
      { color: "#A8DADC", label: "Segment 3", value: 1, minWidth: 50 },
    ],
    containerWidth: 100,
  },
  {
    description: "Edge: MinWidth exceeding containerWidth",
    segments: [
      { color: "#A8DADC", label: "Segment 1", value: 1, minWidth: 100 },
      { color: "#3B3F42", label: "Segment 2", value: 1, minWidth: 100 },
    ],
    containerWidth: 100,
  },
  {
    description: "Edge: Ignore zero-value segments",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 0, minWidth: 50 },
      { color: "#0E7490", label: "Segment 2", value: 100, minWidth: 50 },
    ],
    containerWidth: 100,
  },
  {
    description: "Edge: Empty array of segments",
    segments: [],
    containerWidth: 100,
  },
  {
    description: "Advanced: Mix of minWidth and proportional allocation",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 30, minWidth: 30 },
      { color: "#0E7490", label: "Segment 2", value: 20, minWidth: 10 },
      { color: "#A8DADC", label: "Segment 3", value: 50, minWidth: 10 },
    ],
    containerWidth: 100,
  },
  {
    description: "Advanced: Mix of overlap and proportional widths",
    segments: [
      { color: "#E38577", label: "Segment 1", value: 40, minWidth: 20 },
      { color: "#0E7490", label: "Segment 2", value: 40, minWidth: 20 },
      { color: "#A8DADC", label: "Segment 3", value: 20, minWidth: 20 },
    ],
    containerWidth: 100,
  },
]

const scaleSegmentSets = (
  segmentSets: SegmentCase[],
  scaleFactor: number
): SegmentCase[] => {
  return [...segmentSets].map(({ description, segments, containerWidth }) => ({
    description,
    containerWidth: containerWidth * scaleFactor,
    segments: segments.map((segment) => {
      return {
        ...segment,
        minWidth: segment.minWidth * scaleFactor,
      }
    }),
  }))
}

export const segmentSetsPreview2_48: SegmentCase[] = scaleSegmentSets(
  segmentSets,
  2.48
)

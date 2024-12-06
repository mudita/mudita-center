/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface SegmentBarItem {
  color: string
  label: string
  value: number
  minWidth: number
}

interface AdjustedSegment extends SegmentBarItem {
  usesMinWidth: boolean
}

interface ComputedSegmentBarItem extends SegmentBarItem {
  width: string
  left: string
  zIndex: number
}

export interface SegmentBarProps {
  segments: SegmentBarItem[]
}

const calculateTotalSegmentValue = (segments: SegmentBarItem[]): number =>
  segments.reduce((sum, segment) => sum + segment.value, 0)

const calculateOverlapAdjustment = (segments: SegmentBarItem[]): number =>
  segments.reduce(
    (totalOverlap, segment, index) =>
      totalOverlap + (index > 0 ? segment.minWidth / 2 : 0),
    0
  )

const adjustSegmentsForMinWidth = (
  segments: SegmentBarItem[],
  totalSegmentValue: number,
  containerWidthWithOverlap: number
): {
  adjustedSegments: AdjustedSegment[]
  remainingWidth: number
  remainingTotalSegmentValue: number
} => {
  let remainingWidth = containerWidthWithOverlap
  let remainingTotalSegmentValue = totalSegmentValue

  const adjustedSegments = segments.map((segment) => {
    const proportionalWidth =
      (segment.value / totalSegmentValue) * containerWidthWithOverlap
    const finalWidth = Math.max(segment.minWidth, proportionalWidth)
    const usesMinWidth = finalWidth === segment.minWidth

    if (usesMinWidth) {
      remainingWidth -= segment.minWidth
      remainingTotalSegmentValue -= segment.value
    }

    return {
      ...segment,
      usesMinWidth,
    }
  })

  return { adjustedSegments, remainingWidth, remainingTotalSegmentValue }
}

const calculateWidth = (
  segment: AdjustedSegment,
  totalSegmentValue: number,
  remainingSegmentValue: number,
  remainingWidth: number,
  containerWidthWithOverlap: number
): number => {
  if (remainingWidth < 0) {
    return (segment.value / totalSegmentValue) * containerWidthWithOverlap
  }
  return segment.usesMinWidth
    ? segment.minWidth
    : (segment.value / remainingSegmentValue) * remainingWidth
}


const calculateSegmentPositions = (
  segments: AdjustedSegment[],
  totalSegmentValue: number,
  remainingSegmentValue: number,
  remainingWidth: number,
  containerWidth: number,
  containerWidthWithOverlap: number
): ComputedSegmentBarItem[] => {
  let cumulativeLeft = 0
  let totalOverlap = 0

  return segments.map((segment, index) => {
    const width = calculateWidth(
      segment,
      totalSegmentValue,
      remainingSegmentValue,
      remainingWidth,
      containerWidthWithOverlap
    )

    const overlapCorrection = index > 0 ? segment.minWidth / 2 : 0
    totalOverlap += overlapCorrection

    const widthPercent = ((width / containerWidth) * 100).toFixed(2)
    const leftPercent = (
      ((cumulativeLeft - totalOverlap) / containerWidth) *
      100
    ).toFixed(2)

    cumulativeLeft += width

    const { usesMinWidth, ...segmentWithoutUsesMinWidth } = segment

    return {
      ...segmentWithoutUsesMinWidth,
      width: `${widthPercent}%`,
      left: `${leftPercent}%`,
      zIndex: segments.length - index,
    }
  })
}

export const computeSegmentBarItems = (
  segments: SegmentBarItem[],
  containerWidth: number
): ComputedSegmentBarItem[] => {
  const filteredSegments = segments.filter((segment) => segment.value > 0)

  const totalSegmentValue = calculateTotalSegmentValue(filteredSegments)
  const overlapAdjustment = calculateOverlapAdjustment(filteredSegments)
  const containerWidthWithOverlap = containerWidth + overlapAdjustment

  const { adjustedSegments, remainingWidth, remainingTotalSegmentValue } =
    adjustSegmentsForMinWidth(
      filteredSegments,
      totalSegmentValue,
      containerWidthWithOverlap
    )

  return calculateSegmentPositions(
    adjustedSegments,
    totalSegmentValue,
    remainingTotalSegmentValue,
    remainingWidth,
    containerWidth,
    containerWidthWithOverlap
  )
}

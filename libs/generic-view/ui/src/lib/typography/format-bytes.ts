/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextTransformOptions } from "generic-view/models"

export const formatBytes = (
  bytes: number,
  options: TextTransformOptions = {}
): string => {
  if (isNaN(bytes) || bytes < 0) {
    console.warn("Invalid size")
    return String(bytes)
  }

  const { minUnit = "B" } = options
  const units = ["B", "KB", "MB", "GB", "TB"]
  let minIndex = units.indexOf(minUnit)
  if (minIndex === -1) minIndex = 0

  if (bytes === 0) {
    return `0 ${units[minIndex]}`
  }

  let calculatedIndex = Math.floor(Math.log(bytes) / Math.log(1000))
  calculatedIndex = Math.min(calculatedIndex, units.length - 1)

  const index = Math.max(minIndex, calculatedIndex)

  const adjustedBytes = bytes / Math.pow(1000, index)

  const roundedValue = parseFloat(adjustedBytes.toFixed(1))

  if (roundedValue === 0) {
    return `0 ${units[minIndex]}`
  }

  return roundedValue % 1 === 0
    ? `${Math.round(roundedValue)} ${units[index]}`
    : `${roundedValue} ${units[index]}`
}

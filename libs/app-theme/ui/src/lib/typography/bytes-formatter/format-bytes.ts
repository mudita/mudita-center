/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type Bytes = number

export interface Options {
  minUnit?: string
}

export const formatBytes = (bytes: Bytes, options: Options = {}): string => {
  if (isNaN(bytes) || bytes < 0) {
    console.warn("Invalid size")
    return String(bytes)
  }
  const units = ["B", "KB", "MB", "GB", "TB"]
  const { minUnit = "B" } = options

  const minIndex = units.indexOf(minUnit)

  if (bytes === 0) {
    return `0 ${units[minIndex]}`
  }

  const calculatedIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1000)),
    units.length - 1
  )

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

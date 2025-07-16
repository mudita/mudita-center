/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { promises as fs } from "fs"
import { formatBytes } from "../../../ui/src/lib/typography/format-bytes"

/**
 * Calculates the total size of files given their paths (async version).
 *
 * @param filePaths - An array of file paths.
 * @returns The total size of all files in bytes.
 */
const getTotalFileSizeAsync = async (filePaths: string[]): Promise<number> => {
  let totalSize = 0

  for (const filePath of filePaths) {
    try {
      const stats = await fs.stat(filePath)
      if (stats.isFile()) {
        totalSize += stats.size
      }
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error)
    }
  }

  return totalSize
}

interface CompareValuesResult {
  isSufficient: boolean
  difference: number
}

/**
 * Compares two numeric values and checks if the first value is sufficient to accommodate the second.
 *
 * @param available - The available amount (e.g., free space in bytes).
 * @param required - The required amount (e.g., total size of files in bytes).
 * @returns A result object indicating if the first value is sufficient and the difference.
 */
export const compareValues = (
  available: number,
  required: number
): CompareValuesResult => {
  const difference =
    Math.ceil(Math.abs(available - required) / 1000 ** 2) * 1000 ** 2

  return {
    isSufficient: required <= available,
    difference,
  }
}

export async function isStorageSpaceSufficientForUpload(
  availableSpace: number,
  filePaths: string[]
): Promise<
  CompareValuesResult & {
    formattedDifference: string
  }
> {
  const totalFileSize = await getTotalFileSizeAsync(filePaths)
  return CalculateAndFormatAvailableSpace(availableSpace, totalFileSize)
}

export const CalculateAndFormatAvailableSpace = (
  availableSpace: number,
  totalSpace: number
) => {
  const { isSufficient, difference } = compareValues(availableSpace, totalSpace)

  const formattedDifference = formatBytes(Math.abs(difference), {
    minUnit: "B",
  })

  return { isSufficient, difference, formattedDifference }
}

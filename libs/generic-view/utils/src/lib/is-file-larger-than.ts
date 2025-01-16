/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { promises as fs } from "fs"

/**
 * Checks if the file at the given path is larger than the specified size.
 *
 * @param filePath - The path to the file.
 * @param sizeInBytes - The size to compare against, in bytes.
 * @returns A promise that resolves to `true` if the file is larger, `false` otherwise.
 */

export const isFileLargerThan = async (
  filePath: string,
  sizeInBytes: number
): Promise<boolean> => {
  try {
    const stats = await fs.stat(filePath)
    if (!stats.isFile()) {
      throw new Error(`${filePath} is not a valid file.`)
    }

    return stats.size > sizeInBytes
  } catch (error) {
    console.error(`Error checking file size for ${filePath}:`, error)
    return false
  }
}

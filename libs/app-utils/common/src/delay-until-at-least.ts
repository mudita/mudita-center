/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { delay } from "./delay"

/**
 * Runs an async function and ensures it takes at least the given time.
 * Waits the remaining time if the function finishes early.
 *
 * @param fn - The async function to run.
 * @param ms - Minimum total duration in milliseconds.
 * @returns A promise with the function result after at least the specified time.
 */

export async function delayUntilAtLeast<T>(
  fn: () => Promise<T>,
  ms: number
): Promise<T> {
  const start = Date.now()
  let result: T
  try {
    result = await fn()
  } finally {
    const elapsed = Date.now() - start
    if (elapsed < ms) {
      await delay(ms - elapsed)
    }
  }
  return result
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Creates a promise that resolves when the provided function resolves,
 * but not before a specified delay.
 * @param promise - The async function to run.
 * @param ms - The minimum time to wait in milliseconds before resolving.
 * @returns A promise that resolves with the result of the `fn` after at least the specified time
 */
export const delayUntil = async <T>(
  promise: Promise<T>,
  ms: number
): Promise<T> => {
  const delayPromise = new Promise((resolve) =>
    setTimeout(resolve, Math.max(ms, 0))
  )
  const [response] = await Promise.all([promise, delayPromise])
  return response
}

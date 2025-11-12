/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * Helper function to add a timeout to any async operation.
 * @param {Promise} asyncFunction - The async function that returns a Promise.
 * @param {number} timeoutMs - The timeout in milliseconds.
 * @param {string} error - The custom error message to be used if timeout occurs.
 * @returns {Promise} - Resolves with the result of the async function or rejects with the timeout error.
 */

export const withTimeout = <T>(
  asyncFunction: Promise<T>,
  timeoutMs = 5000,
  error: Error = new Error("Timeout exceeded")
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(error), timeoutMs)
  )

  return Promise.race([asyncFunction, timeout])
}

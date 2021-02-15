/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

/**
 * The function set a timeout. Returns a promise of the timeout and a function to cancel a set timeout.
 *
 * Parameter Value
 * `ms` - Optional. The number of milliseconds to wait before executing the code. If omitted, the value 0 is used
 * Tip: 1000 ms = 1 second.
 *
 * Return Array Values
 * `promise` - first element is a promise of the timeout
 * `cancel` - second element is a function to cancel a set timeout
 *
 * Example
 * ```ts
 *  const [promise, cancel] = timeout(1000)
 *
 *  promise.then(() => console.log("The promise isn't resolved"))
 *  cancel()
 *  console.log("Log is visible before the timeout")
 * ```
 */

const timeout = (ms: number): [Promise<void>, () => void] => {
  let timeoutId: NodeJS.Timeout

  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(() => resolve(), ms)
  })

  const cancel = () => clearTimeout(timeoutId)

  return [promise, cancel]
}

export default timeout

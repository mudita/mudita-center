/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { delayUntil } from "./delay-until"

const delayThreshold = 10

describe("delayUntil", () => {
  it("should wait for the specified minimum time even if promise resolved quicker", async () => {
    const expectedResult = "quick promise test"
    const quickPromise = Promise.resolve(expectedResult)
    const delay = 100

    const startTime = Date.now()
    const result = await delayUntil(quickPromise, delay)
    const endTime = Date.now()
    const actualDelay = endTime - startTime

    expect(result).toBe(expectedResult)
    expect(actualDelay).toBeGreaterThanOrEqual(delay - delayThreshold)
  })

  it("should wait for a promise to resolve if it takes longer than specified delay", async () => {
    const expectedResult = "slow promise test"
    const promiseDelay = 500

    const slowPromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve(expectedResult), promiseDelay)
    })

    const startTime = Date.now()
    const result = await delayUntil(slowPromise, 100)
    const endTime = Date.now()
    const actualDelay = endTime - startTime

    expect(result).toBe(expectedResult)
    expect(actualDelay).toBeGreaterThanOrEqual(promiseDelay - delayThreshold)
  })

  it("should handle zero delay correctly", async () => {
    const expectedResult = "zero delay test"
    const zeroDelayPromise = Promise.resolve(expectedResult)

    const startTime = Date.now()
    const result = await delayUntil(zeroDelayPromise, 0)
    const endTime = Date.now()
    const actualDelay = endTime - startTime

    expect(result).toBe(expectedResult)
    expect(actualDelay).toBeLessThanOrEqual(delayThreshold)
  })

  it("should handle negative delay by treating it as zero", async () => {
    const expectedResult = "negative delay test"
    const negativeDelayPromise = Promise.resolve(expectedResult)

    const startTime = Date.now()
    const result = await delayUntil(negativeDelayPromise, -100)
    const endTime = Date.now()
    const actualDelay = endTime - startTime

    expect(result).toBe(expectedResult)
    expect(actualDelay).toBeLessThanOrEqual(delayThreshold)
  })
})

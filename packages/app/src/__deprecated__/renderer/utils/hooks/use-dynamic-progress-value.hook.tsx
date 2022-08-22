/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"

interface Options {
  minFrequencyFactor?: number
  increasingFrequencyFactor?: number
  reducingFrequencyFactor?: number
  limitValue?: number
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDynamicProgressValue = (
  progressValue: number,
  options: Options = {}
) => {
  const {
    minFrequencyFactor = 0.4,
    increasingFrequencyFactor = 1.1,
    reducingFrequencyFactor = 2.4,
    limitValue = 99,
  } = options
  const [frequencyFactor, setFrequencyFactor] = useState(1)
  const [value, setValue] = useState(0)

  const increaseFrequencyFactor = (factor: number): number => {
    return factor * increasingFrequencyFactor
  }
  const reduceFrequencyFactor = (factor: number): number => {
    const reducedFactor = factor / reducingFrequencyFactor
    return reducedFactor > minFrequencyFactor
      ? reducedFactor
      : minFrequencyFactor
  }

  useEffect(() => {
    if (progressValue === 100) {
      setValue(progressValue)
      return
    }

    const timeout = setTimeout(() => {
      if (progressValue > value) {
        setValue((prevValue) => ++prevValue)
        setFrequencyFactor(reduceFrequencyFactor)
      } else if (value < limitValue) {
        setValue((prevValue) => ++prevValue)
        setFrequencyFactor(increaseFrequencyFactor)
      }
    }, 100 * frequencyFactor)
    return () => clearTimeout(timeout)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressValue, value])

  return value
}

export default useDynamicProgressValue

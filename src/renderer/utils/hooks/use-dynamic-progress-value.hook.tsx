import { useEffect, useState } from "react"

interface Option {
  minFrequencyFactor?: number
  increasingFrequencyFactor?: number
  reducingFrequencyFactor?: number
  limitValue?: number
}

const useDynamicProgressValue = (
  progressValue: number,
  option: Option = {}
) => {
  const {
    minFrequencyFactor = 0.4,
    increasingFrequencyFactor = 1.1,
    reducingFrequencyFactor = 2.4,
    limitValue = 99,
  } = option
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
    const timeout = setTimeout(() => {
      if (progressValue === 100) {
        setValue(progressValue)
      } else if (progressValue > value) {
        setValue((prevValue) => ++prevValue)
        setFrequencyFactor(reduceFrequencyFactor)
      } else if (value < limitValue) {
        setValue((prevValue) => ++prevValue)
        setFrequencyFactor(increaseFrequencyFactor)
      }
    }, 100 * frequencyFactor)
    return () => clearTimeout(timeout)
  }, [progressValue, value])

  return value
}

export default useDynamicProgressValue

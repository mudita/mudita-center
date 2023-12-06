/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

type Seconds = number

enum Unit {
  Minute = 60,
  Hour = Unit.Minute * 60,
  Day = Unit.Hour * 24,
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const formatDuration = (seconds: Seconds) => {
  let secondsLeft = seconds

  const countDuration = (unit: Unit) => {
    const unitsCount = Math.floor(secondsLeft / unit)
    secondsLeft -= unitsCount * unit
    return unitsCount
  }

  const duration: Record<string, number | string> = {
    d: countDuration(Unit.Day),
    h: countDuration(Unit.Hour),
    m: countDuration(Unit.Minute),
    s: secondsLeft,
  }

  return (
    Object.keys(duration)
      .reduce((a, b) => {
        return duration[b] !== 0 ? (a += `${duration[b]}${b} `) : a
      }, "")
      .slice(0, -1) || "0s"
  )
}

export default formatDuration

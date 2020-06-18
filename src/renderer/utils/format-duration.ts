type Seconds = number

enum Unit {
  Minute = 60,
  Hour = Unit.Minute * 60,
  Day = Unit.Hour * 24,
}

const formatDuration = (
  seconds: Seconds,
  shortZeroNotation: boolean = true
) => {
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

  const zeroNotation = shortZeroNotation ? "0s" : "0m 0s"

  const secs = shortZeroNotation || duration.s > 0 ? "" : `${duration.s}s`

  return (
    Object.keys(duration)
      .reduce((a, b) => {
        return duration[b] !== 0 ? (a += `${duration[b]}${b} ${secs}`) : a
      }, "")
      .trim() || zeroNotation
  )
}

export default formatDuration

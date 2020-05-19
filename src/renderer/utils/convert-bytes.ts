import round from "lodash/round"

export const convertBytes = (
  bytes: number,
  forceFractions: boolean = true,
  fractionDigits: number = 2
): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"]

  if (bytes === 0) {
    return bytes + " " + sizes[0]
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  if (i === 0) {
    return bytes + " " + sizes[i]
  }

  const value = bytes / 1024 ** i

  const returnedValue = forceFractions
    ? value.toFixed(fractionDigits)
    : round(value, fractionDigits)

  return returnedValue + " " + sizes[i]
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const flattenEntityConfiguration = (
  obj: Record<string, unknown>,
  prefix: string = ""
): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  for (const key in obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, key) ||
      ["validators"].includes(key)
    ) {
      continue
    }
    let currentKey = key
    switch (key) {
      case "items":
        currentKey = "[]"
        break
      case "fields":
        currentKey = "."
        break
      case "type":
        currentKey = ""
    }
    const value = obj[key]
    const newKey = prefix ? `${prefix}${currentKey}` : currentKey

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenEntityConfiguration(value as Record<string, unknown>, newKey)
      )
    } else {
      result[newKey] = value
    }
  }

  return result
}

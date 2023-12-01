/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const filterRecordsByPhrase = <T>(
  records: T[],
  searchPhrase: string,
  filterKeys: (keyof T)[],
  additionalChecks: ((record: T, searchPhrase: string) => boolean)[] = []
): T[] => {
  const result = records.filter((record) => {
    const loweredSearch = searchPhrase.toLowerCase()

    for (const key of filterKeys) {
      const value = record[key]

      if (typeof value === "string") {
        if (value.toLowerCase().includes(loweredSearch)) {
          return true
        }
      }
    }

    for (const check of additionalChecks) {
      if (check(record, loweredSearch)) {
        return true
      }
    }

    return false
  })
  return result
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const versionFormatter = (version: string): string => {
  const [releaseVersion, suffix] = version.split("-")

  if (!suffix) {
    return version
  }

  const releaseSuffixArray = suffix.split(".")

  if (releaseSuffixArray.length < 4) {
    return version
  }

  const [name, year, month, day] = releaseSuffixArray
  const formattedMonth = month.replace(/0/g, "")
  const formattedDay = day?.replace(/0/g, "")

  return [
    releaseVersion,
    [name, year, formattedMonth, formattedDay].join("."),
  ].join("-")
}

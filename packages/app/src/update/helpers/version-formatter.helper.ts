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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line prefer-const
  let [name, year, month, day] = releaseSuffixArray
  month = month?.replace(/0/g, "")
  day = day?.replace(/0/g, "")

  return [releaseVersion, [name, year, month, day].join(".")].join("-")
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload";

const isVersionMatch = (version= ""): boolean => semver.valid(version) !== null

const isOsVersionSupported = (
  osVersion: string,
  lowestSupportedOsVersion: string
): boolean => {
  if(!isVersionMatch(osVersion) || !isVersionMatch(lowestSupportedOsVersion)){
    throw new Error("One of the passed argument isn't semantic version")
  } else {
    return semver.gte(osVersion, lowestSupportedOsVersion)
  }
}

export default isOsVersionSupported

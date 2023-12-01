/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"
import isVersionMatch from "App/overview/helpers/is-version-match"

const isVersionGreater = (v1: string, v2: string): boolean => {
  if (!isVersionMatch(v1)) {
    throw new Error(`v1 argument isn't semantic version: ${v1}`)
  } else if (!isVersionMatch(v2)) {
    throw new Error(`v2 argument isn't semantic version: ${v2}`)
  } else {
    return semver.gt(v1, v2)
  }
}

export default isVersionGreater

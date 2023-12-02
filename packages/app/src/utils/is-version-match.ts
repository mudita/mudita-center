/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"

const isVersionMatch = (tagName = ""): boolean => {
  const [version] = tagName.split("_").reverse()

  return semver.valid(version) !== null
}

export default isVersionMatch

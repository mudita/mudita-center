/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"

const getPrereleaseLabels = (version = ""): readonly (string | number)[] =>
  semver.prerelease(version) ?? []

export default getPrereleaseLabels

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"

const isVersionMatch = (version = ""): boolean => semver.valid(version) !== null

export default isVersionMatch

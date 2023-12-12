/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getPrereleaseLabels from "Core/utils/get-prerelease-labels"

const isPrereleaseSet = (version = ""): boolean =>
  getPrereleaseLabels(version).length !== 0

export default isPrereleaseSet

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"

class VersionValidateHelper {
  public async isVersionValid(version: string): Promise<boolean> {
    return Boolean(semver.valid(version))
  }
}

export default new VersionValidateHelper()

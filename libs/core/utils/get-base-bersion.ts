/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"

const getBaseVersion = (version = "") => {
  const baseVersion = semver.parse(version);
  if (baseVersion) {
    return `${baseVersion.major}.${baseVersion.minor}.${baseVersion.patch}`;
  }

  return null;
};

export default getBaseVersion

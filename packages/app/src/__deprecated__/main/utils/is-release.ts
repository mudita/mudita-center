/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import isVersionMatch from "App/overview/helpers/is-version-match"

export const isRelease = (version: string): boolean => {
  if(isVersionMatch(version)){
    return /(\d+\.){2}\d+$/i.test(version)
  } else {
    return false
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sliceSegments } from "app-utils/common"

const internalPathPrefix = "/storage/emulated/0/"
export const isMtpPathInternal = (path: string) => {
  return path.startsWith(internalPathPrefix)
}
export const sliceMtpPaths = (path: string, isInternal: boolean) => {
  const basePath = isInternal
    ? path.replace(internalPathPrefix, "").replace(/\/$/, "")
    : sliceSegments(path, 2)

  return sliceSegments(basePath, 0, -1)
}

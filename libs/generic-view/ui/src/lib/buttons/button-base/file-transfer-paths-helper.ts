/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sliceSegments } from "shared/utils"

const internalPathPrefix = "/storage/emulated/0/"

export const sliceMtpPaths = (path: string, isInternal: boolean) => {
  return isInternal
    ? path.replace(internalPathPrefix, "").replace(/\/$/, "")
    : sliceSegments(path, 2)
}

export const getDevicePath = (path: string) => {
  return path.includes(internalPathPrefix)
    ? internalPathPrefix
    : "/" + sliceSegments(path, 0, 2) + "/"
}

export const isMtpPathInternal = (path: string) => {
  return path.startsWith(internalPathPrefix)
}

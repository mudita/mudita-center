/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { camelCase } from "lodash"

export const getFileManagerLoaderKey = (feature: string) => {
  return `${camelCase(feature)}fileManagerLoader`
}

export const getFileManagerMainStorageFormKey = (feature: string) => {
  return `${camelCase(feature)}mainStorageForm`
}

export const getFileManagerStoragePageKey = (
  feature: string,
  index?: number,
  suffix = ""
) => {
  return `${camelCase(feature)}${(index || "").toString()}${suffix}`
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import StorageCategoryInfo from "App/__deprecated__/common/interfaces/storage-category-info.interface"

export default interface StorageInfo {
  // Reserved space in bytes.
  readonly reservedSpace: number

  // Categories of the occupied storage
  readonly categories: StorageCategoryInfo[]

  //Total space of Pure device in bytes
  readonly totalSpace: number

  // Used user space in bytes
  readonly usedUserSpace: number
}

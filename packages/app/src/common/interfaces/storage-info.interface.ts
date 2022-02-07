/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"

export default interface StorageInfo {
  // Capacity in bytes.
  readonly capacity: number

  // Availability in bytes.
  readonly available: number

  // Categories of the occupied storage
  readonly categories: StorageCategoryInfo[]

  //Total space of Pure device in bytes
  readonly totalSpace: number
}

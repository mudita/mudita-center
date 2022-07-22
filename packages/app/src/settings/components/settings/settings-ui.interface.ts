/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Properties {
  autostart: boolean
  tethering: boolean
  collectingData: boolean | undefined
  toggleTethering: (value: boolean) => void
  toggleCollectionData: (value: boolean) => void
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Reducers {
  readonly updatePhoneOsInfo: (updateInfo: PhoneUpdate) => void
}

export interface PhoneUpdate {
  pureOsFileUrl?: string
  pureOsAvailable?: boolean
  pureOsDownloaded?: boolean
}

export type PhoneUpdateStore = Reducers & PhoneUpdate

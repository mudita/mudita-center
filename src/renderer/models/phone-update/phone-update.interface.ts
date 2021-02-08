/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Filename } from "Renderer/interfaces/file-download.interface"

export interface Reducers {
  readonly updatePhoneOsInfo: (updateInfo: PhoneUpdate) => void
}

export interface PhoneUpdate {
  pureOsFileName?: Filename
  pureOsAvailable?: boolean
  pureOsDownloaded?: boolean
}

export type PhoneUpdateStore = Reducers & PhoneUpdate

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReleaseProcessState } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"

export interface ProcessedRelease {
  release: OsRelease
  state: ReleaseProcessState
}

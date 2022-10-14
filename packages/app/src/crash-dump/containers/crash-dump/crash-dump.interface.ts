/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { CrashDump } from "App/crash-dump/dto"

export interface CrashDumpContainerProps {
  hasCrashDump: boolean
  sending: boolean
  sended: boolean
  failed: boolean
  deviceType: DeviceType | null
  downloadCrashDump: (payload: CrashDump) => void
  ignoreCrashDump: () => void
  resetCrashDump: () => void
}

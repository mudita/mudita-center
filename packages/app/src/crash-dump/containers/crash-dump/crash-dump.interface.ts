/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { CrashDump } from "App/crash-dump/dto"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"

export interface CrashDumpContainerProps {
  hasCrashDump: boolean
  sending: boolean
  sended: boolean
  failed: boolean
  layer?: ModalLayers
  deviceType: DeviceType | null
  downloadCrashDump: (payload: CrashDump) => void
  ignoreCrashDump: () => void
  resetCrashDump: () => void
  sendCrashDumpData: (payload: CrashDump) => void
}

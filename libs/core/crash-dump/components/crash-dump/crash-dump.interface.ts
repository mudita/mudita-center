/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { CrashDump } from "Core/crash-dump/dto"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

export interface CrashDumpContainerProps {
  sending: boolean
  sended: boolean
  failed: boolean
  layer?: ModalLayers
  deviceType: DeviceType | null
  downloadCrashDump: (payload: CrashDump) => void
  ignoreCrashDump: () => void
  resetCrashDump: () => void
}

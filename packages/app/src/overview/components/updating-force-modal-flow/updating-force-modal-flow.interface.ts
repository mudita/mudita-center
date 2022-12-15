/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { OsRelease } from "App/update/dto"

export interface UpdatingForceModalFlowProps {
  state: UpdatingForceModalFlowState | undefined
  osVersion: string | undefined
  onContact: () => void
  onHelp: () => void
  updateOs: (releases: OsRelease[]) => void
  deviceType: DeviceType
  batteryLevel: number
  closeModal: () => void
}

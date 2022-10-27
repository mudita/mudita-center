/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ComponentProps } from "react"

export interface UpdatingForceModalFlowProps
  extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  state: UpdatingForceModalFlowState | undefined
  osVersion: string | undefined
  onContact: () => void
  onHelp: () => void
  updateOs: (fileName: string) => void
  deviceType: DeviceType
  batteryLevel: number
}

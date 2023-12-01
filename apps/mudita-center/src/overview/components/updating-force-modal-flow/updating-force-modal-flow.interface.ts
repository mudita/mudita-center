/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"
import { UpdateError } from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"

export interface UpdatingForceModalFlowProps {
  enabled: boolean
  error: AppError<UpdateError> | null
  availableReleasesForUpdate: OsRelease[] | null
  updatingReleasesProcessStates: ProcessedRelease[] | null
  forceUpdateState: State
  deviceType: DeviceType
  startForceUpdate: () => void
  openHelpView: () => void
  openContactSupportFlow: () => void
  closeForceUpdateFlow: () => void
  layer?: ModalLayers
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { AppError } from "Core/core/errors"
import { DeviceType } from "device-protocol/models"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { UpdateError } from "Core/update/constants"
import { OsRelease, ProcessedRelease } from "Core/update/dto"

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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { modalsManagerStateSelector } from "Core/modals-manager/selectors/modals-manager-state.selector"
import { ModalsManagerState } from "Core/modals-manager/reducers"
import { State } from "Core/core/constants"
import { ConnectionState, DeviceState } from "Core/device"
import { settingsStateSelector } from "Core/settings/selectors"
import { SettingsState } from "Core/settings/reducers"
import { deviceStateSelector } from "Core/device/selectors"
import { backupStateSelector } from "Core/backup/selectors/backup-state.selector"
import { BackupState } from "Core/backup"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"
import { UpdateOsState } from "Core/update/reducers/update-os.interface"

export const deviceInitializationFailedModalShowEnabledSelector =
  createSelector<
    ReduxRootState,
    ModalsManagerState,
    SettingsState,
    DeviceState,
    BackupState,
    UpdateOsState,
    boolean
  >(
    modalsManagerStateSelector,
    settingsStateSelector,
    deviceStateSelector,
    backupStateSelector,
    updateStateSelector,
    (
      modalsManagerState,
      settingsState,
      deviceState,
      backupState,
      updateState
    ) => {
      return (
        settingsState.loaded &&
        deviceState.state === ConnectionState.Error &&
        // TODO: Move manage an order of the modal displaying to the view component
        !modalsManagerState.appForcedUpdateFlowShow &&
        !modalsManagerState.appUpdateFlowShow &&
        !modalsManagerState.contactSupportFlowShow &&
        modalsManagerState.deviceInitializationFailedModalShow &&
        // TODO: Move the bellow loading checks as selector to the new dedicate domain
        updateState.updateOsState !== State.Loading &&
        backupState.restoringState !== State.Loading &&
        backupState.backingUpState !== State.Loading
      )
    }
  )

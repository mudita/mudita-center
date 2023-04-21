/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { modalsManagerStateSelector } from "App/modals-manager/selectors/modals-manager-state.selector"
import { ModalsManagerState } from "App/modals-manager/reducers"
import { State } from "App/core/constants"
import { ConnectionState, DeviceState } from "App/device"
import { settingsStateSelector } from "App/settings/selectors"
import { SettingsState } from "App/settings/reducers"
import { deviceStateSelector } from "App/device/selectors"
import { backupStateSelector } from "App/backup/selectors/backup-state-selector"
import { BackupState } from "App/backup"
import { updateStateSelector } from "App/update/selectors/update-state-selector"
import { UpdateOsState } from "App/update/reducers/update-os.interface"

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
        !modalsManagerState.collectingDataModalShow &&
        !modalsManagerState.appForcedUpdateFlowShow &&
        !modalsManagerState.appUpdateFlowShow &&
        !modalsManagerState.contactSupportFlowShow &&
        modalsManagerState.deviceInitializationFailedModalShow &&
        // TODO: Move the bellow loading checks as selector to the new dedicate domain
        !(updateState.updateOsState === State.Loading) &&
        !(backupState.restoringState === State.Loading) &&
        !(backupState.backingUpState === State.Loading)
      )
    }
  )

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Overview from "App/overview/components/overview/overview.component"
import { ReduxRootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import {
  UpdatingState,
  PureDeviceData,
  disconnectDevice,
  setUpdateState,
  startUpdateOs,
} from "App/device"
import { lastBackupDateSelector } from "App/backup/selectors"
import { startBackupDevice } from "App/backup-device/actions"
import { readBackupDeviceDataState } from "App/backup-device/actions/base.action"
import {
  readRestoreDeviceDataState,
  startRestoreDevice,
  StartRestoreOption,
} from "App/restore-device/actions"
import { ModalStateKey, showModal } from "App/modals-manager"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { getDeviceLatestVersion } from "App/settings/selectors"

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  return {
    deviceType: state.device.deviceType,
    lastBackupDate: lastBackupDateSelector(state),
    batteryLevel: state.device.data?.batteryLevel,
    osVersion: state.device.data?.osVersion,
    memorySpace: state.device.data?.memorySpace,
    serialNumber: state.device.data?.serialNumber,
    networkName: (state.device.data as PureDeviceData)?.networkName,
    networkLevel: Number((state.device.data as PureDeviceData)?.networkLevel),
    caseColour: (state.device.data as PureDeviceData)?.caseColour,
    backupDeviceState: state.backupDevice.state,
    restoreDeviceState: state.restoreDevice.state,
    backups: state.backup.backups,
    ...state.phoneUpdate,
    ...state.devMode,
    syncState: state.dataSync.state,
    lowestSupportedOsVersion: getDeviceLatestVersion(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  disconnectDevice: () => dispatch(disconnectDevice()),
  setUpdateState: (state: UpdatingState) => dispatch(setUpdateState(state)),
  startUpdateOs: (file: string) => dispatch(startUpdateOs(file)),
  startBackupDevice: (secretKey: string) =>
    dispatch(
      startBackupDevice({
        secretKey,
      })
    ),
  readBackupDeviceDataState: () => dispatch(readBackupDeviceDataState()),
  readRestoreDeviceDataState: () => dispatch(readRestoreDeviceDataState()),
  startRestoreDevice: (option: StartRestoreOption) =>
    dispatch(startRestoreDevice(option)),
  openContactSupportFlow: () =>
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
  // TODO refactor legacy staff
  updatePhoneOsInfo: (updateInfo: PhoneUpdate) =>
    dispatch.phoneUpdate.update(updateInfo),
  updateAllIndexes: () => dispatch(updateAllIndexes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)

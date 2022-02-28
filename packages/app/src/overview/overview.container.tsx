/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import Overview from "App/overview/components/overview/overview.component"
import { ReduxRootState, TmpDispatch } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import {
  UpdatingState,
  PureDeviceData,
  disconnectDevice,
  changeSim,
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

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  return {
    lastBackupDate: lastBackupDateSelector(state),
    deviceType: state.device.deviceType,
    batteryLevel: state.device.data?.batteryLevel,
    osVersion: state.device.data?.osVersion,
    memorySpace: state.device.data?.memorySpace,
    serialNumber: state.device.data?.serialNumber,
    simCards: (state.device.data as PureDeviceData)?.simCards,
    networkName: (state.device.data as PureDeviceData)?.networkName,
    networkLevel: (state.device.data as PureDeviceData)?.networkLevel,
    caseColour: (state.device.data as PureDeviceData)?.caseColour,
    backupDeviceState: state.backupDevice.state,
    restoreDeviceState: state.restoreDevice.state,
    backups: state.backup.backups,
    ...state.phoneUpdate,
    ...state.settings,
    ...state.devMode,
    syncState: state.dataSync.state,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  disconnectDevice: () => dispatch(disconnectDevice()),
  changeSim: (card: SimCard) => dispatch(changeSim(card)),
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import Overview from "App/overview/components/overview/overview.component"
import { ReduxRootState, TmpDispatch } from "App/__deprecated__/renderer/store"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import { PureDeviceData, disconnectDevice, DeviceType } from "App/device"
import { lastBackupDateSelector } from "App/backup/selectors"
import {
  startBackupDevice,
  startRestoreDevice,
  readBackupDeviceDataState,
  readRestoreDeviceDataState,
} from "App/backup/actions"
import { RestoreBackup } from "App/backup/dto"
import { ModalStateKey, showModal } from "App/modals-manager"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { getDeviceLatestVersion } from "App/settings/selectors"
import {
  checkForUpdate,
  downloadUpdates,
  setUpdateState,
  startUpdateOs,
  clearState,
  cancelDownload,
} from "App/update/actions"
import { State } from "App/core/constants"
import { OsRelease } from "App/update/dto"

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
    pureOsBackupLocation: state.settings.osBackupLocation,
    backupDeviceState: state.backup.backingUpState,
    restoreDeviceState: state.backup.restoringState,
    backups: state.backup.data.backups,
    ...state.devMode,
    syncState: state.dataSync.state,
    lowestSupportedOsVersion: getDeviceLatestVersion(state),
    updatingState: state.update.updateOsState,
    checkingForUpdateState: state.update.checkForUpdateState,
    availableReleasesForUpdate: state.update.data.availableReleasesForUpdate,
    downloadingState: state.update.downloadState,
    allReleases: state.update.data.allReleases,
    updateOsError: state.update.error,
    silentUpdateCheck: state.update.silentUpdateCheck,
    downloadingReleasesProcessStates:
      state.update.data.downloadedProcessedReleases,
    updatingReleasesProcessStates: state.update.data.updateProcessedReleases,
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  disconnectDevice: () => dispatch(disconnectDevice()),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  setUpdateState: (state: State) => dispatch(setUpdateState(state)),
  startUpdateOs: (releases: OsRelease[]) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(startUpdateOs({ releases })),
  startBackupDevice: (key: string) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(
      startBackupDevice({
        key,
      })
    ),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  readBackupDeviceDataState: () => dispatch(readBackupDeviceDataState()),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  readRestoreDeviceDataState: () => dispatch(readRestoreDeviceDataState()),
  startRestoreDevice: (option: RestoreBackup) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(startRestoreDevice(option)),
  openContactSupportFlow: () =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  updateAllIndexes: () => dispatch(updateAllIndexes()),
  checkForUpdate: (deviceType: DeviceType) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(checkForUpdate({ deviceType, isSilentCheck: false })),
  silentCheckForUpdate: (deviceType: DeviceType) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(checkForUpdate({ deviceType, isSilentCheck: true })),
  downloadUpdates: (releases: OsRelease[]) =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(downloadUpdates({ releases })),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  clearUpdateState: () => dispatch(clearState()),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  abortDownload: () => dispatch(cancelDownload()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)

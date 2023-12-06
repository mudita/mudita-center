/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ErrorSyncModal from "Core/connecting/components/error-sync-modal/error-sync-modal"
import { State } from "Core/core/constants"
import { SynchronizationState } from "Core/data-sync/reducers"
import { DeviceType } from "Core/device/constants"
import { Feature, flags } from "Core/feature-flags"
import BackupDeviceFlow, {
  BackupDeviceFlowState,
} from "Core/overview/components/backup-device-flow/backup-device-flow.component"
import OverviewContent from "Core/overview/components/overview-screens/pure-overview/overview-content.component"
import { PureOverviewProps } from "Core/overview/components/overview-screens/pure-overview/pure-overview.interface"
import RestoreDeviceFlow, {
  RestoreDeviceFlowState,
} from "Core/overview/components/restore-device-flow/restore-device-flow.component"
import { UpdateOsFlow } from "Core/overview/components/update-os-flow"
import UpdatingForceModalFlow from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { CheckForUpdateMode } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import logger from "Core/__deprecated__/main/utils/logger"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import React, { useEffect, useState } from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

export const PureOverview: FunctionComponent<PureOverviewProps> = ({
  batteryLevel = 0,
  disconnectDevice = noop,
  osVersion = "",
  memorySpace = {
    reservedSpace: 0,
    usedUserSpace: 16000000000,
    total: 16000000000,
  },
  networkName,
  networkLevel,
  pureOsBackupLocation = "",
  updatingState,
  startUpdateOs,
  caseColour,
  lastBackupDate,
  startBackupDevice,
  backupDeviceState,
  readBackupDeviceDataState,
  startRestoreDevice,
  restoreDeviceState,
  readRestoreDeviceDataState,
  backups,
  openContactSupportFlow,
  syncState,
  updateAllIndexes,
  serialNumber,
  checkForUpdate,
  checkingForUpdateState,
  availableReleasesForUpdate,
  downloadingState,
  clearUpdateState,
  abortDownload,
  allReleases,
  updateOsError,
  downloadUpdates,
  downloadingReleasesProcessStates,
  updatingReleasesProcessStates,
  silentCheckForUpdateState,
  areAllReleasesDownloaded,
  backupError,
  setCheckForUpdateState,
  forceUpdateNeeded,
  forceUpdate,
  forceUpdateState,
  closeForceUpdateFlow,
  backupActionDisabled,
}) => {
  const [openModal, setOpenModal] = useState({
    backupStartModal: false,
    loadingModal: false,
    finishedModal: false,
    failedModal: false,
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let progressSimulator: NodeJS.Timeout
    if (openModal.loadingModal) {
      progressSimulator = setInterval(() => {
        setProgress((prevState) => prevState + 2)
        if (progress === 100) {
          setProgress(0)
          setOpenModal((prevState) => ({
            ...prevState,
            loadingModal: false,
            finishedModal: true,
          }))
          logger.info("Backup creation finished.")
        }
      }, 100)
    }

    if (!openModal.loadingModal) {
      setProgress(0)
    }

    return () => {
      clearInterval(progressSimulator)
    }
  }, [openModal, progress])

  const goToHelp = (): void => {
    void ipcRenderer.callMain(HelpActions.OpenWindow)
  }

  const [backupDeviceFlowState, setBackupDeviceFlowState] =
    useState<BackupDeviceFlowState>()

  const handleBackupCreate = () => {
    setBackupDeviceFlowState(BackupDeviceFlowState.Start)
  }

  const closeBackupDeviceFlowState = () => {
    setBackupDeviceFlowState(undefined)
    readBackupDeviceDataState()
  }

  useEffect(() => {
    if (backupDeviceState === State.Loading) {
      setBackupDeviceFlowState(BackupDeviceFlowState.Running)
    } else if (backupDeviceState === State.Loaded) {
      setBackupDeviceFlowState(BackupDeviceFlowState.Finished)
    } else if (backupDeviceState === State.Failed) {
      setBackupDeviceFlowState(BackupDeviceFlowState.Error)
    } else {
      setBackupDeviceFlowState(undefined)
    }
  }, [backupDeviceState])

  const [restoreDeviceFlowState, setRestoreDeviceFlowState] =
    useState<RestoreDeviceFlowState>()

  const handleRestoreCreate = () => {
    setRestoreDeviceFlowState(RestoreDeviceFlowState.Start)
  }

  const closeRestoreDeviceFlowState = () => {
    setRestoreDeviceFlowState(undefined)
    readRestoreDeviceDataState()
  }

  useEffect(() => {
    if (restoreDeviceState === State.Loading) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Running)
    } else if (restoreDeviceState === State.Loaded) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Finished)
    } else if (restoreDeviceState === State.Failed) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Error)
    } else {
      setRestoreDeviceFlowState(undefined)
    }
  }, [restoreDeviceState])

  const onRetry = () => {
    void updateAllIndexes()
  }

  const shouldErrorSyncModalVisible = (): boolean => {
    if (syncState !== SynchronizationState.Error) {
      return false
    }

    return (
      restoreDeviceState === undefined || restoreDeviceState === State.Initial
    )
  }

  const updateReleases = (devReleases?: OsRelease[]) => {
    const releasesToInstall = devReleases ?? availableReleasesForUpdate

    releasesToInstall &&
      releasesToInstall.length > 0 &&
      startUpdateOs(releasesToInstall)
  }

  const downloadReleases = (devReleases?: OsRelease[]) => {
    const releasesToDownload = devReleases ?? availableReleasesForUpdate

    releasesToDownload &&
      releasesToDownload.length > 0 &&
      downloadUpdates(releasesToDownload)
  }

  const checkForPureUpdate = () => {
    checkForUpdate(DeviceType.MuditaPure, CheckForUpdateMode.Normal)
  }

  const tryAgainPureUpdate = () => {
    checkForUpdate(DeviceType.MuditaPure, CheckForUpdateMode.TryAgain)
  }

  const openCheckForUpdateModal = () => {
    setCheckForUpdateState(CheckForUpdateState.Loaded)
  }

  const startForceUpdate = () => {
    const releasesToInstall = availableReleasesForUpdate

    releasesToInstall &&
      releasesToInstall.length > 0 &&
      forceUpdate(releasesToInstall)
  }

  return (
    <>
      {!forceUpdateNeeded && (
        <UpdateOsFlow
          deviceType={DeviceType.MuditaPure}
          currentOsVersion={osVersion}
          silentCheckForUpdateState={silentCheckForUpdateState}
          checkForUpdateState={checkingForUpdateState}
          availableReleasesForUpdate={availableReleasesForUpdate}
          areAllReleasesDownloaded={areAllReleasesDownloaded}
          downloadState={downloadingState}
          tryAgainCheckForUpdate={tryAgainPureUpdate}
          clearUpdateOsFlow={clearUpdateState}
          downloadUpdates={downloadReleases}
          abortDownloading={abortDownload}
          updateState={updatingState}
          updateOs={updateReleases}
          openContactSupportFlow={openContactSupportFlow}
          allReleases={allReleases}
          openHelpView={goToHelp}
          error={updateOsError}
          downloadingReleasesProcessStates={downloadingReleasesProcessStates}
          updatingReleasesProcessStates={updatingReleasesProcessStates}
        />
      )}

      {flags.get(Feature.ForceUpdate) && (
        <UpdatingForceModalFlow
          deviceType={DeviceType.MuditaPure}
          availableReleasesForUpdate={availableReleasesForUpdate}
          updatingReleasesProcessStates={updatingReleasesProcessStates}
          enabled={forceUpdateNeeded}
          startForceUpdate={startForceUpdate}
          error={updateOsError}
          openHelpView={goToHelp}
          openContactSupportFlow={openContactSupportFlow}
          forceUpdateState={forceUpdateState}
          closeForceUpdateFlow={closeForceUpdateFlow}
        />
      )}
      {backupDeviceFlowState && (
        <BackupDeviceFlow
          openState={backupDeviceFlowState}
          pureOsBackupLocation={pureOsBackupLocation}
          onStartBackupDeviceButtonClick={startBackupDevice}
          closeModal={closeBackupDeviceFlowState}
          onSupportButtonClick={openContactSupportFlow}
          error={backupError}
        />
      )}
      {restoreDeviceFlowState && (
        <RestoreDeviceFlow
          openState={restoreDeviceFlowState}
          backups={backups}
          onStartRestoreDeviceButtonClick={startRestoreDevice}
          closeModal={closeRestoreDeviceFlowState}
          onSupportButtonClick={openContactSupportFlow}
          error={backupError}
        />
      )}
      {shouldErrorSyncModalVisible() && (
        <ErrorSyncModal open onRetry={onRetry} closeModal={close} />
      )}
      <OverviewContent
        batteryLevel={batteryLevel}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        memorySpace={memorySpace}
        networkName={networkName}
        networkLevel={networkLevel}
        onUpdateCheck={checkForPureUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={openCheckForUpdateModal}
        caseColour={caseColour}
        lastBackupDate={lastBackupDate}
        onBackupCreate={handleBackupCreate}
        onBackupRestore={handleRestoreCreate}
        serialNumber={serialNumber}
        backupActionDisabled={backupActionDisabled}
      />
    </>
  )
}

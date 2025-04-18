/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ErrorSyncModal from "Core/connecting/components/error-sync-modal/error-sync-modal"
import { State } from "Core/core/constants"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { DeviceType } from "device-protocol/models"
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
import logger from "Core/__deprecated__/main/utils/logger"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { useCallback, useEffect, useState } from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { useWatchDeviceDataEffect } from "Core/overview/components/overview-screens/helpers/use-watch-device-data-effect"
import { useSelector } from "react-redux"
import {
  isActiveDeviceAttachedSelector,
  useDeactivateDeviceAndRedirect,
} from "device-manager/feature"
import { selectDeviceErrorModalOpened } from "generic-view/store"
import { useHelpShortcut } from "help/store"

export const PureOverview: FunctionComponent<PureOverviewProps> = ({
  batteryLevel = 0,
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
  useWatchDeviceDataEffect()
  const activeDeviceAttached = useSelector(isActiveDeviceAttachedSelector)
  const deactivateDeviceAndRedirect = useDeactivateDeviceAndRedirect()
  const genericDeviceErrorModalOpened = useSelector(
    selectDeviceErrorModalOpened
  )
  const openHelpShortcut = useHelpShortcut()

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

  const goToHelp = () => {
    openHelpShortcut("pure-os-update-fail")
  }

  const [backupDeviceFlowState, setBackupDeviceFlowState] =
    useState<BackupDeviceFlowState>()

  const handleBackupCreate = () => {
    setBackupDeviceFlowState(BackupDeviceFlowState.Start)
  }

  const closeBackupDeviceFlowState = () => {
    setBackupDeviceFlowState(undefined)
    readBackupDeviceDataState()
    if (!activeDeviceAttached) {
      void deactivateDeviceAndRedirect()
    }
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

  const closeRestoreDeviceFlowState = useCallback(() => {
    setRestoreDeviceFlowState(undefined)
    readRestoreDeviceDataState()
    if (!activeDeviceAttached) {
      void deactivateDeviceAndRedirect()
    }
  }, [
    activeDeviceAttached,
    deactivateDeviceAndRedirect,
    readRestoreDeviceDataState,
  ])

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
    if (syncState !== SynchronizationStatus.Error) {
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
      {!genericDeviceErrorModalOpened && (
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
              openHelpView={goToHelp}
              error={updateOsError}
              downloadingReleasesProcessStates={
                downloadingReleasesProcessStates
              }
              updatingReleasesProcessStates={updatingReleasesProcessStates}
            />
          )}

          {flags.get(Feature.ForceUpdate) && (
            <UpdatingForceModalFlow
              deviceType={DeviceType.MuditaPure}
              availableReleasesForUpdate={availableReleasesForUpdate}
              updatingReleasesProcessStates={updatingReleasesProcessStates}
              enabled={forceUpdateNeeded}
              checkForUpdateState={checkingForUpdateState}
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
        </>
      )}
      <OverviewContent
        batteryLevel={batteryLevel}
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

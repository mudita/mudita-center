/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import React, { useEffect, useState } from "react"
import OverviewContent from "App/overview/components/overview-screens/pure-overview/overview-content.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { SettingsState } from "App/main/store/settings.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/main/utils/logger"
import BackupDeviceFlow, {
  BackupDeviceFlowState,
} from "App/overview/components/backup-device-flow/backup-device-flow.component"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import UpdatingForceModalFlow, {
  UpdatingForceModalFlowState,
} from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { DeviceState } from "App/device"
import {
  BackupDeviceDataState,
  BackupDeviceState,
} from "App/backup-device/reducers"
import { BackupState } from "App/backup/reducers"
import RestoreDeviceFlow, {
  RestoreDeviceFlowState,
} from "App/overview/components/restore-device-flow/restore-device-flow.component"
import {
  RestoreDeviceDataState,
  RestoreDeviceState,
} from "App/restore-device/reducers"
import { DeviceType } from "@mudita/pure"
import { StartRestoreOption } from "App/restore-device/actions"
import { SynchronizationState } from "App/data-sync/reducers"
import ErrorSyncModal from "App/connecting/components/error-sync-modal/error-sync-modal"

type Props = DeviceState["data"] &
  PhoneUpdateStore &
  SettingsState &
  DevMode & {
    backups: BackupState["backups"]
    backupDeviceState: BackupDeviceState["state"]
    readBackupDeviceDataState: () => void
    startBackupDevice: (secretKey: string) => void
    restoreDeviceState: RestoreDeviceState["state"]
    startRestoreDevice: (option: StartRestoreOption) => void
    readRestoreDeviceDataState: () => void
    openContactSupportFlow: () => void
    syncState: SynchronizationState
    updateAllIndexes: () => Promise<void>
  }

export const PureOverview: FunctionComponent<Props> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  osVersion = "",
  lastAvailableOsVersion,
  updatePhoneOsInfo = noop,
  memorySpace = {
    free: 0,
    full: 16000000000,
  },
  simCards = [
    {
      networkLevel: 0,
      network: undefined,
      active: false,
      number: 0,
      slot: 1,
    },
  ],
  networkName,
  networkLevel,
  pureOsBackupLocation = "",
  lowestSupportedOsVersion = "",
  updatingState,
  startUpdateOs,
  setUpdateState,
  caseColour,
  lastBackupDate,
  startBackupDevice,
  backupDeviceState,
  readBackupDeviceDataState,
  startRestoreDevice,
  restoreDeviceState,
  readRestoreDeviceDataState,
  backups,
  pureOsDownloaded,
  openContactSupportFlow,
  syncState,
  updateAllIndexes,
  serialNumber,
}) => {
  const [osVersionSupported, setOsVersionSupported] = useState(true)
  const [openModal, setOpenModal] = useState({
    backupStartModal: false,
    loadingModal: false,
    finishedModal: false,
    failedModal: false,
  })
  const [progress, setProgress] = useState(0)

  const goToHelp = (): void => {
    void ipcRenderer.callMain(HelpActions.OpenWindow)
  }

  // FIXME: tmp solution until useSystemUpdateFlow exist
  const toggleDeviceUpdating = (option: boolean) => {
    if (option) {
      setUpdateState(UpdatingState.Updating)
    } else {
      setUpdateState(UpdatingState.Standby)
    }
  }

  const { release, initialCheck, check, download, install } =
    useSystemUpdateFlow(
      osVersion,
      updatePhoneOsInfo,
      toggleDeviceUpdating,
      openContactSupportFlow,
      goToHelp
    )

  useEffect(() => {
    try {
      setOsVersionSupported(
        isVersionGreater(osVersion, lowestSupportedOsVersion)
      )
    } catch (error) {
      logger.error(`Overview: ${(error as Error).message}`)
    }
  }, [osVersion, lowestSupportedOsVersion])

  useEffect(() => {
    if (osVersion) {
      initialCheck()
    }
  }, [osVersion])

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

  const closeUpdatingForceModalFlow = async () => {
    setUpdateState(UpdatingState.Standby)
  }

  const isPureOsAvailable = (): boolean => {
    try {
      if (!osVersion || !lastAvailableOsVersion || !release) {
        return false
      } else {
        return !isVersionGreater(osVersion, lastAvailableOsVersion)
      }
    } catch (error) {
      logger.error(`Overview (isPureOsAvailable): ${(error as Error).message}`)
      return false
    }
  }

  const getUpdatingForceModalFlowState = ():
    | UpdatingForceModalFlowState
    | undefined => {
    if (updatingState === UpdatingState.Success) {
      return UpdatingForceModalFlowState.Success
    } else if (updatingState === UpdatingState.Fail) {
      return UpdatingForceModalFlowState.Fail
    } else if (!osVersionSupported) {
      return UpdatingForceModalFlowState.Info
    } else {
      return undefined
    }
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
    if (backupDeviceState === BackupDeviceDataState.Running) {
      setBackupDeviceFlowState(BackupDeviceFlowState.Running)
    } else if (backupDeviceState === BackupDeviceDataState.Finished) {
      setBackupDeviceFlowState(BackupDeviceFlowState.Finished)
    } else if (backupDeviceState === BackupDeviceDataState.Error) {
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
    if (restoreDeviceState === RestoreDeviceDataState.Running) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Running)
    } else if (restoreDeviceState === RestoreDeviceDataState.Finished) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Finished)
    } else if (restoreDeviceState === RestoreDeviceDataState.Error) {
      setRestoreDeviceFlowState(RestoreDeviceFlowState.Error)
    } else {
      setRestoreDeviceFlowState(undefined)
    }
  }, [restoreDeviceState])

  const onRetry = () => {
    updateAllIndexes()
  }

  return (
    <>
      <UpdatingForceModalFlow
        deviceType={DeviceType.MuditaPure}
        state={getUpdatingForceModalFlowState()}
        updateOs={startUpdateOs}
        osVersion={osVersion}
        closeModal={closeUpdatingForceModalFlow}
        onContact={openContactSupportFlow}
        onHelp={goToHelp}
        batteryLevel={batteryLevel}
      />
      {backupDeviceFlowState && (
        <BackupDeviceFlow
          openState={backupDeviceFlowState}
          pureOsBackupLocation={pureOsBackupLocation}
          onStartBackupDeviceButtonClick={startBackupDevice}
          closeModal={closeBackupDeviceFlowState}
          onSupportButtonClick={openContactSupportFlow}
        />
      )}
      {restoreDeviceFlowState && (
        <RestoreDeviceFlow
          openState={restoreDeviceFlowState}
          backups={backups}
          onStartRestoreDeviceButtonClick={startRestoreDevice}
          closeModal={closeRestoreDeviceFlowState}
          onSupportButtonClick={openContactSupportFlow}
        />
      )}
      {syncState === SynchronizationState.Error && (
        <ErrorSyncModal open onRetry={onRetry} closeModal={close} />
      )}
      <OverviewContent
        batteryLevel={batteryLevel}
        changeSim={changeSim}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        memorySpace={memorySpace}
        simCards={simCards}
        networkName={networkName}
        networkLevel={networkLevel}
        pureOsAvailable={isPureOsAvailable()}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={download}
        caseColour={caseColour}
        deviceType={DeviceType.MuditaPure}
        lastBackupDate={lastBackupDate}
        onBackupCreate={handleBackupCreate}
        onBackupRestore={handleRestoreCreate}
        serialNumber={serialNumber}
      />
    </>
  )
}

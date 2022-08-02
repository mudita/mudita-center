/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import React, { useEffect, useState } from "react"
import OverviewContent from "App/overview/components/overview-screens/pure-overview/overview-content.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/__deprecated__/main/utils/logger"
import BackupDeviceFlow, {
  BackupDeviceFlowState,
} from "App/overview/components/backup-device-flow/backup-device-flow.component"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import UpdatingForceModalFlow, {
  UpdatingForceModalFlowState,
} from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { Backup } from "App/backup/reducers"
import RestoreDeviceFlow, {
  RestoreDeviceFlowState,
} from "App/overview/components/restore-device-flow/restore-device-flow.component"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { DeviceType, CaseColour } from "@mudita/pure"
import { StartRestoreOption } from "App/restore-device/actions"
import { SynchronizationState } from "App/data-sync/reducers"
import { MemorySpace } from "App/files-manager/components/files-manager/files-manager.interface"
import ErrorSyncModal from "App/connecting/components/error-sync-modal/error-sync-modal"

interface PureOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
  readonly lastAvailableOsVersion: string
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly memorySpace: MemorySpace | undefined
  readonly networkName: string
  readonly networkLevel: number
  readonly pureOsBackupLocation: string
  readonly updatingState: UpdatingState
  readonly caseColour: CaseColour
  readonly lastBackupDate: Date
  readonly backupDeviceState: BackupDeviceDataState
  readonly restoreDeviceState: RestoreDeviceDataState
  readonly backups: Backup[]
  readonly pureOsDownloaded: boolean | undefined
  readonly syncState: SynchronizationState
  readonly serialNumber: string | undefined
  readonly updateAllIndexes: () => Promise<void>
  readonly openContactSupportFlow: () => void
  readonly readRestoreDeviceDataState: () => void
  readonly startRestoreDevice: (option: StartRestoreOption) => void
  readonly readBackupDeviceDataState: () => void
  readonly startBackupDevice: (secretKey: string) => void
  readonly setUpdateState: (data: UpdatingState) => void
  readonly startUpdateOs: (data: string) => void
  readonly updatePhoneOsInfo: (data: PhoneUpdate) => void
  readonly disconnectDevice: () => void
}

export const PureOverview: FunctionComponent<PureOverviewProps> = ({
  batteryLevel = 0,
  disconnectDevice = noop,
  osVersion = "",
  lastAvailableOsVersion,
  updatePhoneOsInfo = noop,
  memorySpace = {
    free: 0,
    full: 16000000000,
    total: 16000000000,
  },
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
      { osVersion, serialNumber, deviceType: DeviceType.MuditaPure },
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      initialCheck()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateAllIndexes()
  }

  const shouldErrorSyncModalVisible = (): boolean => {
    if (syncState !== SynchronizationState.Error) {
      return false
    }
    return (
      restoreDeviceState === undefined ||
      restoreDeviceState === RestoreDeviceDataState.Empty
    )
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
        pureOsAvailable={isPureOsAvailable()}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={download}
        caseColour={caseColour}
        lastBackupDate={lastBackupDate}
        onBackupCreate={handleBackupCreate}
        onBackupRestore={handleRestoreCreate}
        serialNumber={serialNumber}
      />
    </>
  )
}

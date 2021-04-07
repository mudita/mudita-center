/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  Store as BasicInfoInitialState,
  StoreValues as BasicInfoValues,
} from "Renderer/models/basic-info/basic-info.typings"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import React, { useEffect, useState } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"
import { useStore } from "react-redux"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import { BackupFailedModal } from "Renderer/modules/overview/backup-process/backup-failed-modal.component"
import { BackupFinishedModal } from "Renderer/modules/overview/backup-process/backup-finished-modal.component"
import { BackupLoadingModal } from "Renderer/modules/overview/backup-process/backup-loading-modal.component"
import { BackupStartModal } from "Renderer/modules/overview/backup-process/backup-start-modal.component"
import { mockedBackupItems } from "App/__mocks__/mocked-backup-items"
import logger from "App/main/utils/logger"

export interface UpdateBasicInfo {
  updateBasicInfo?: (updateInfo: Partial<BasicInfoValues>) => void
  toggleUpdatingDevice: (option: boolean) => void
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
}

const Overview: FunctionComponent<
  BasicInfoInitialState &
    PhoneUpdateStore &
    UpdateBasicInfo &
    AppSettings &
    DevMode
> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  lastBackup,
  osVersion,
  osUpdateDate,
  pureOsAvailable,
  pureOsDownloaded,
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
  updateBasicInfo = noop,
  toggleUpdatingDevice,
  language,
  loadData,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [backups, setBackup] = useState(0)
  // let restorations = 0
  const [modals, setModals] = useState({
    backupStartModal: false,
    loadingModal: false,
    finishedModal: false,
    failedModal: false,
  })
  const [progress, setProgress] = useState(0)
  const store = useStore()

  const { initialCheck, check, download, install } = useSystemUpdateFlow(
    osUpdateDate,
    osVersion,
    updatePhoneOsInfo,
    updateBasicInfo,
    toggleUpdatingDevice
  )

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (osVersion) {
      initialCheck()
    }
  }, [osVersion])

  useEffect(() => {
    let progressSimulator: NodeJS.Timeout
    if (modals.loadingModal) {
      progressSimulator = setInterval(() => {
        setProgress((prevState) => prevState + 2)
        if (progress === 20) {
          setProgress(0)
          setModals((prevState) => ({
            ...prevState,
            loadingModal: false,
            finishedModal: true,
          }))
          logger.info("Backup creation finished.")
        }
      }, 100)
    }

    return () => {
      clearInterval(progressSimulator)
    }
  }, [modals, progress])

  useEffect(() => {
    if (backups === 3)  {
      setModals((prevState) => ({
        ...prevState,
        loadingModal: false,
        failedModal: true,
      }))
    }
  }, [backups])

  const openBackupLoadingModal = () => {
    setBackup(prevState => prevState + 1)
    logger.info("Creating backup...")
    closeBackupStartModal()
    setModals((prevState) => ({
      ...prevState,
      loadingModal: true,
    }))
  }

  const openBackupStartModal = () => {
    setModals((prevState) => ({
      ...prevState,
      backupStartModal: true,
    }))
  }

  const closeBackupStartModal = () => {
    setModals((prevState) => ({
      ...prevState,
      backupStartModal: false,
    }))
  }

  const closeBackupFinishedModal = () => {
    setModals((prevState) => ({
      ...prevState,
      finishedModal: false,
    }))
  }

  const closeBackupFailedModal = () => {
    setModals((prevState) => ({
      ...prevState,
      failedModal: false,
    }))
  }

  // const openBackupRestorationFinishedModal = () => {
  //   logger.info("Backup restoration finished.")
  //   modalService.openModal(<BackupRestorationFinishedModal />, true)
  // }
  //
  // const openBackupRestorationFailedModal = () => {
  //   // TODO: Add an error to the message after implementing phone backup
  //   logger.error("Backup restoration failed.")
  //   modalService.openModal(<BackupRestorationFailedModal />, true)
  // }
  //
  // const openBackupRestorationLoadingModal = () => {
  //   restorations++
  //   logger.info(
  //     `Restoring backup from ${lastBackup?.createdAt} with a size of ${lastBackup?.size} bytes.`
  //   )
  //
  //   simulateProgress(
  //     <BackupRestorationLoadingModal />,
  //     openBackupRestorationFailedModal,
  //     openBackupRestorationFinishedModal,
  //     restorations % 3 === 0
  //   )
  // }

  // const openBackupRestorationStartModal = () => {
  //   modalService.openModal(
  //     <BackupRestorationStartModal
  //       items={mockedBackupItems}
  //       restoreBackup={openBackupRestorationLoadingModal}
  //     />
  //   )
  // }

  return (
    <>
      <BackupStartModal
        isOpen={modals.backupStartModal}
        items={mockedBackupItems}
        startBackup={openBackupLoadingModal}
        total={"18.1 Gb"}
        date={
          lastBackup &&
          new Date(lastBackup.createdAt).toLocaleDateString(language)
        }
        closeModal={closeBackupStartModal}
      />
      <BackupLoadingModal isOpen={modals.loadingModal} progress={progress} />,
      <BackupFinishedModal
        isOpen={modals.finishedModal}
        items={mockedBackupItems}
        destination={store.getState().settings.pureOsBackupLocation as string}
        closeModal={closeBackupFinishedModal}
      />
      <BackupFailedModal isOpen={modals.failedModal} closeModal={closeBackupFailedModal}/>
      <OverviewUI
        batteryLevel={batteryLevel}
        changeSim={changeSim}
        disconnectDevice={disconnectDevice}
        lastBackup={lastBackup}
        osVersion={osVersion}
        osUpdateDate={osUpdateDate}
        memorySpace={memorySpace}
        simCards={simCards}
        networkName={networkName}
        networkLevel={networkLevel}
        pureOsAvailable={pureOsAvailable}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={download}
        onOpenBackupModal={openBackupStartModal}
        onOpenBackupRestorationModal={noop}
        language={language}
      />
    </>
  )
}

export default Overview

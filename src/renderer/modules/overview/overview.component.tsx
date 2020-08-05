import Button from "Renderer/components/core/button/button.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import React, { ReactElement, useEffect, useState } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"
import log from "Renderer/utils/log"
import { useStore } from "react-redux"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import { AppSettings } from "App/main/store/settings.interface"
import modalService from "Renderer/components/core/modal/modal.service"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import { BackupFailedModal } from "Renderer/modules/overview/backup-process/backup-failed-modal"
import { BackupFinishedModal } from "Renderer/modules/overview/backup-process/backup-finished-modal"
import { BackupLoadingModal } from "Renderer/modules/overview/backup-process/backup-loading-modal"
import { BackupStartModal } from "Renderer/modules/overview/backup-process/backup-start-modal"
import { BackupRestorationFailedModal } from "Renderer/modules/overview/backup-process/restoration-failed-modal"
import { BackupRestorationLoadingModal } from "Renderer/modules/overview/backup-process/restoration-loading-modal"
import { BackupRestorationStartModal } from "Renderer/modules/overview/backup-process/restoration-start-modal"
import { BackupRestorationFinishedModal } from "Renderer/modules/overview/backup-process/restoration-finished-modal"
import { mockedBackupItems } from "App/__mocks__/mocked-backup-items"

// TODO: remove after implementing real phone update process
interface FakeUpdatedStatus {
  fakeUpdatedStatus?: () => void
}

/**
 * TODO: Remove after implementing the real backup system
 */
const simulateProgress = async (
  Component: ReactElement,
  onFail: () => void,
  onSuccess: () => void,
  fail?: boolean
) => {
  let progress = 0
  let progressSimulator: NodeJS.Timeout

  const cancel = () => {
    log.warn("Cancelling operation")
    clearInterval(progressSimulator)
  }

  await modalService.openModal(
    React.cloneElement(Component, { onClose: cancel }),
    true
  )

  /**
   * Temporary interval to simulate backup restoration process
   */
  progressSimulator = setInterval(() => {
    if (progress < 100) {
      progress += 2
      modalService.rerenderModal(
        React.cloneElement(Component, { onClose: cancel, progress })
      )
      if (fail && progress > 30) {
        clearInterval(progressSimulator)
        onFail()
      }
    } else {
      clearInterval(progressSimulator)
      onSuccess()
    }
  }, 100)
}

const Overview: FunctionComponent<
  BasicInfoInitialState & PhoneUpdateStore & FakeUpdatedStatus & AppSettings
> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  lastBackup,
  osVersion,
  osUpdateDate = 0,
  pureOsFileName = "",
  pureOsAvailable,
  pureOsDownloaded,
  updatePhoneOsInfo = noop,
  loadData = noop,
  memorySpace = {
    free: 0,
    full: 16000000000,
  },
  simCards = [
    {
      network: undefined,
      active: false,
      number: 0,
      slot: 1,
    },
  ],
  networkName,
  fakeUpdatedStatus = noop,
  language,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [backups, setBackups] = useState(1)
  const [restorations, setRestorations] = useState(1)

  const store = useStore()
  const { initialCheck, check, download, install } = useSystemUpdateFlow(
    new Date(osUpdateDate).toISOString(),
    updatePhoneOsInfo,
    fakeUpdatedStatus
  )

  useEffect(() => {
    ;(async () => {
      await loadData()
      initialCheck()
    })()
  }, [])

  const onUpdateDownload = () => download(pureOsFileName)

  const openBackupFinishedModal = () => {
    log.log("Backup creation finished.")
    modalService.openModal(
      <BackupFinishedModal
        items={mockedBackupItems}
        destination={store.getState().settings.pureOsBackupLocation as string}
      />,
      true
    )
  }

  const openBackupFailedModal = () => {
    // TODO: Add an error to the message after implementing phone backup
    log.error("Backup creation failed.")
    modalService.openModal(<BackupFailedModal />, true)
  }

  const openBackupLoadingModal = () => {
    setBackups((value) => value + 1)
    log.log("Creating backup...")

    simulateProgress(
      <BackupLoadingModal />,
      openBackupFailedModal,
      openBackupFinishedModal,
      backups % 3 === 0
    )
  }

  const openBackupStartModal = () => {
    setBackups((value) => value + 1)

    modalService.openModal(
      <BackupStartModal
        startBackup={openBackupLoadingModal}
        fileSize={convertBytes(lastBackup.size)}
        date={new Date(lastBackup.createdAt).toLocaleDateString(
          language && language.tag
        )}
      />
    )
  }

  const openBackupRestorationFinishedModal = () => {
    log.log("Backup restoration finished.")
    modalService.openModal(<BackupRestorationFinishedModal />, true)
  }

  const openBackupRestorationFailedModal = () => {
    // TODO: Add an error to the message after implementing phone backup
    log.log("Backup restoration failed.")
    modalService.openModal(<BackupRestorationFailedModal />, true)
  }

  const openBackupRestorationLoadingModal = () => {
    setRestorations((value) => value + 1)
    log.log(
      `Restoring backup from ${lastBackup.createdAt} with a size of ${lastBackup.size} bytes.`
    )

    simulateProgress(
      <BackupRestorationLoadingModal />,
      openBackupRestorationFailedModal,
      openBackupRestorationFinishedModal,
      restorations % 3 === 0
    )
  }

  const openBackupRestorationStartModal = () => {
    modalService.openModal(
      <BackupRestorationStartModal
        items={mockedBackupItems}
        restoreBackup={openBackupRestorationLoadingModal}
      />
    )
  }

  return (
    <>
      <DevModeWrapper>
        {/** Totally random data */}
        <p>Phone signal: 1800Mhz</p>
        <p>Battery cycles: 99/100</p>
        <Button onClick={noop} label="Restart phone" />
        <br />
        <Button onClick={noop} label="Hard restart phone" />
        <br />
        <Button onClick={noop} label="Flush phone data" />
      </DevModeWrapper>
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
        pureOsAvailable={pureOsAvailable}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={onUpdateDownload}
        onOpenBackupModal={openBackupStartModal}
        onOpenBackupRestorationModal={openBackupRestorationStartModal}
        language={language}
      />
    </>
  )
}

export default Overview

import Button from "Renderer/components/core/button/button.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Store as BasicInfoInitialState } from "Renderer/models/basic-info/interfaces"
import React, { useEffect, useState } from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import modalService from "Renderer/components/core/modal/modal.service"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "Renderer/utils/intl"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import { BackupFailedModal } from "Renderer/modules/overview/backup-process/backup-failed-modal"
import { BackupFinishedModal } from "Renderer/modules/overview/backup-process/backup-finished-modal"
import { BackupLoadingModal } from "Renderer/modules/overview/backup-process/backup-loading-modal"
import { BackupStartModal } from "Renderer/modules/overview/backup-process/backup-start-modal"

// TODO: remove after implementing real phone update process
interface FakeUpdatedStatus {
  fakeUpdatedStatus?: () => void
}

export const messages = defineMessages({
  cancel: { id: "view.generic.button.cancel" },
  ok: { id: "view.generic.button.ok" },
  backupCreateModalTitle: {
    id: "view.name.overview.backup.createBackupModal.title",
  },
  backupCreateModalBody: {
    id: "view.name.overview.backup.createBackupModal.body",
  },
  backupLoadingModalTitle: {
    id: "view.name.overview.backup.loadingBackupModal.title",
  },
  backupLoadingModalBody: {
    id: "view.name.overview.backup.loadingBackupModal.body",
  },
  backupFailedModalTitle: {
    id: "view.name.overview.backup.failedBackupModal.title",
  },
  backupFailedModalBody: {
    id: "view.name.overview.backup.failedBackupModal.body",
  },
  backupFinishedModalTitle: {
    id: "view.name.overview.backup.finishedBackupModal.title",
  },
  backupFinishedModalBody: {
    id: "view.name.overview.backup.finishedBackupModal.body",
  },
})

const backupItems = [
  { name: "Contacts", size: "1 GB" },
  { name: "Messages", size: "15 KB" },
  { name: "Music", size: "14 GB" },
  { name: "Misc files", size: "625 MB" },
  { name: "Notes", size: "11 KB" },
]

const Overview: FunctionComponent<
  BasicInfoInitialState & PhoneUpdateStore & FakeUpdatedStatus
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
}) => {
  /**
   * Temporary state to demo failure
   */
  const [backups, setBackups] = useState(1)
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

  const closeModal = async () => await modalService.closeModal()

  const openBackupFinishedModal = async () => {
    await closeModal()
    await modalService.openModal(
      <BackupFinishedModal
        title={intl.formatMessage(messages.backupFinishedModalTitle)}
        closeAction={closeModal}
        closeLabel={intl.formatMessage(messages.ok)}
        body={{
          id: messages.backupFinishedModalBody.id,
          values: {
            destination: "/var/null",
            ...textFormatters,
          },
        }}
        items={backupItems}
      />
    )
  }

  const openBackupFailedModal = async () => {
    await closeModal()
    await modalService.openModal(
      <BackupFailedModal
        title={intl.formatMessage(messages.backupFailedModalTitle)}
        body={messages.backupFailedModalBody}
      />
    )
  }

  const openBackupLoadingModal = async () => {
    await closeModal()
    await modalService.openModal(
      <BackupLoadingModal
        body={messages.backupLoadingModalBody}
        subtitle={messages.backupLoadingModalTitle}
        onBackupSuccess={openBackupFinishedModal}
        onBackupFailure={openBackupFailedModal}
        failed={backups % 3 === 0}
        title={intl.formatMessage(messages.backupLoadingModalTitle)}
        closeButtonLabel={intl.formatMessage(messages.cancel)}
      />
    )
  }

  const openBackupStartModal = async () => {
    setBackups((value) => value + 1)

    await modalService.openModal(
      <BackupStartModal
        title={intl.formatMessage(messages.backupCreateModalTitle)}
        onActionButtonClick={openBackupLoadingModal}
        actionButtonLabel={intl.formatMessage(messages.backupCreateModalTitle)}
        closeButtonLabel={intl.formatMessage(messages.cancel)}
        body={{
          ...messages.backupCreateModalBody,
          values: {
            filesize: "10 GB",
            date: intl.formatDate("2020-10-20"),
          },
        }}
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
      />
    </>
  )
}

export default Overview

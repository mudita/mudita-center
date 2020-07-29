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
import { intl } from "Renderer/utils/intl"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import {
  BackupFailedModal,
  BackupFinishedModal,
  BackupLoadingModal,
  BackupModal,
} from "Renderer/modules/overview/overview.backupModals"

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
  backupFinishedModalTitle: {
    id: "view.name.overview.backup.finishedBackupModal.title",
  },
  backupFinishedModalBody: {
    id: "view.name.overview.backup.finishedBackupModal.body",
  },
})

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
  const { initialCheck, check, download, install } = useSystemUpdateFlow(
    new Date(osUpdateDate).toISOString(),
    updatePhoneOsInfo,
    fakeUpdatedStatus
  )

  const [backups, setBackups] = useState(1)

  useEffect(() => {
    ;(async () => {
      await loadData()
      initialCheck()
    })()
  }, [])

  const onUpdateDownload = () => download(pureOsFileName)

  const openBackupFinishedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <BackupFinishedModal
        title={intl.formatMessage(messages.backupFinishedModalTitle)}
        body={{
          ...messages.backupFinishedModalBody,
          values: {
            destination: "/var/null",
          },
        }}
      />
    )
  }

  const openBackupFailedModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <BackupFailedModal
        title={intl.formatMessage(messages.backupFailedModalTitle)}
      />
    )
  }

  const openBackupLoadingModal = async () => {
    await modalService.closeModal()
    await modalService.openModal(
      <BackupLoadingModal
        body={messages.backupLoadingModalBody}
        onBackupSuccess={openBackupFinishedModal}
        onBackupFailure={openBackupFailedModal}
        failed={backups % 3 === 0}
        title={intl.formatMessage(messages.backupLoadingModalTitle)}
        closeButtonLabel={intl.formatMessage(messages.cancel)}
      />
    )
  }

  const openBackupModal = async () => {
    setBackups((value) => value + 1)

    await modalService.openModal(
      <BackupModal
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
        onOpenBackupModal={openBackupModal}
      />
    </>
  )
}

export default Overview

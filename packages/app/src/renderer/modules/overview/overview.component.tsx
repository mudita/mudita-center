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
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings } from "App/main/store/settings.interface"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import logger from "App/main/utils/logger"
import BackupModalFlow from "Renderer/components/rest/overview/backup/backup-modal-flow.component"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "App/contacts/components/contact-support-modal/contact-support-modal-flow.component"
import { CreateBugTicketResponseStatus } from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket-builder"
import { ContactSupportFieldValues } from "App/contacts/components/contact-support-modal/contact-support-modal.component"
import useCreateBugTicket, {
  files,
} from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket"

export interface UpdateBasicInfo {
  updateBasicInfo?: (updateInfo: Partial<BasicInfoValues>) => void
  toggleDeviceUpdating: (option: boolean) => void
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
  toggleDeviceUpdating,
  language,
  pureOsBackupLocation,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [backups, setBackup] = useState(0)
  const [openModal, setOpenModal] = useState({
    backupStartModal: false,
    loadingModal: false,
    finishedModal: false,
    failedModal: false,
  })
  const [progress, setProgress] = useState(0)
  const [
    contactSupportOpenState,
    setContactSupportOpenState,
  ] = useState<ContactSupportModalFlowState>()
  const [sendBugTicketRequest, sending] = useCreateBugTicket()
  const [bugTicketSubject, setBugTicketSubject] = useState("")

  const openContactSupportModalFlow = (code?: number) => {
    setBugTicketSubject(`Error - UpdateOS_${code}`)
    setContactSupportOpenState(ContactSupportModalFlowState.Form)
  }

  const closeContactSupportModalFlow = () => {
    setContactSupportOpenState(undefined)
  }

  const sendBugTicket = async ({
    email,
    description,
  }: ContactSupportFieldValues) => {
    const response = await sendBugTicketRequest({
      email,
      description,
      subject: bugTicketSubject,
    })
    if (response.status === CreateBugTicketResponseStatus.Ok) {
      setContactSupportOpenState(ContactSupportModalFlowState.Success)
    } else {
      setContactSupportOpenState(ContactSupportModalFlowState.Fail)
      logger.error(`Overview: ${response.error?.message}`)
    }
  }

  const { initialCheck, check, download, install } = useSystemUpdateFlow(
    osUpdateDate,
    osVersion,
    updatePhoneOsInfo,
    updateBasicInfo,
    toggleDeviceUpdating,
    openContactSupportModalFlow
  )

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

  useEffect(() => {
    if (backups === 3) {
      setOpenModal((prevState) => ({
        ...prevState,
        loadingModal: false,
        failedModal: true,
      }))
    }
  }, [backups])

  const openBackupLoadingModal = () => {
    setBackup((prevState) => prevState + 1)
    logger.info("Creating backup...")
    closeBackupStartModal()
    setOpenModal((prevState) => ({
      ...prevState,
      loadingModal: true,
    }))
  }

  const closeBackupStartModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      backupStartModal: false,
    }))
  }

  const closeBackupLoadingModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      loadingModal: false,
    }))
  }

  const closeBackupFinishedModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      finishedModal: false,
    }))
  }

  const closeBackupFailedModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      failedModal: false,
    }))
  }

  return (
    <>
      {contactSupportOpenState && (
        <ContactSupportModalFlow
          openState={contactSupportOpenState}
          files={files}
          onSubmit={sendBugTicket}
          sending={sending}
          closeModal={closeContactSupportModalFlow}
        />
      )}
      <BackupModalFlow
        openBackupStartModal={openModal.backupStartModal}
        openBackupLoadingModal={openModal.loadingModal}
        openBackupFinishedModal={openModal.finishedModal}
        openBackupFailedModal={openModal.failedModal}
        closeBackupStartModal={closeBackupStartModal}
        closeBackupLoadingModal={closeBackupLoadingModal}
        closeBackupFinishedModal={closeBackupFinishedModal}
        closeBackupFailedModal={closeBackupFailedModal}
        startBackup={openBackupLoadingModal}
        language={language}
        pureOsBackupLocation={pureOsBackupLocation}
        progress={progress}
      />
      <OverviewUI
        batteryLevel={batteryLevel}
        changeSim={changeSim}
        disconnectDevice={disconnectDevice}
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
      />
    </>
  )
}

export default Overview

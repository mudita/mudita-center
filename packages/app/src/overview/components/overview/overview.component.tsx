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
import OverviewContent from "App/overview/components/overview-content.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings, SettingsState } from "App/main/store/settings.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/main/utils/logger"
import BackupModalFlow from "App/overview/components/backup-modals/backup-modal-flow.component"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "Renderer/components/rest/contact-support-modal/contact-support-modal-flow.component"
import { CreateBugTicketResponseStatus } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import { ContactSupportFieldValues } from "Renderer/components/rest/contact-support-modal/contact-support-modal.component"
import useCreateBugTicket, {
  files,
} from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import UpdatingForceModalFlow, {
  UpdatingForceModalFlowState,
} from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"

import { DeviceState } from "App/device"

export interface UpdateBasicInfo {
  toggleDeviceUpdating: (option: boolean) => void
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
}

type Props = DeviceState["data"] & PhoneUpdateStore & SettingsState & DevMode

const Overview: FunctionComponent<Props> = ({
  batteryLevel = 0,
  changeSim = noop,
  disconnectDevice = noop,
  osVersion = "",
  osUpdateDate = "",
  lastAvailableOsVersion,
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
  language = "",
  pureOsBackupLocation = "",
  lowestSupportedOsVersion = "",
  updatingState,
  startUpdateOs,
  setUpdateState,
  serialNumber,
  caseColour,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [osVersionSupported, setOsVersionSupported] = useState(true)
  const [backups, setBackup] = useState(0)
  const [openModal, setOpenModal] = useState({
    backupStartModal: false,
    loadingModal: false,
    finishedModal: false,
    failedModal: false,
  })
  const [progress, setProgress] = useState(0)
  const [contactSupportOpenState, setContactSupportOpenState] =
    useState<ContactSupportModalFlowState>()
  const [sendBugTicketRequest, sending] = useCreateBugTicket()
  const [bugTicketSubject, setBugTicketSubject] = useState("")

  const openContactSupportModalFlow = () => {
    setBugTicketSubject(`Error - UpdateOS`)
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
      serialNumber,
      subject: bugTicketSubject,
    })
    if (response.status === CreateBugTicketResponseStatus.Ok) {
      setContactSupportOpenState(ContactSupportModalFlowState.Success)
    } else {
      setContactSupportOpenState(ContactSupportModalFlowState.Fail)
      logger.error(`Overview: ${response.error?.message}`)
    }
  }

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

  const { initialCheck, check, download, install } = useSystemUpdateFlow(
    osVersion,
    osUpdateDate,
    updatePhoneOsInfo,
    toggleDeviceUpdating,
    openContactSupportModalFlow,
    goToHelp
  )

  useEffect(() => {
    try {
      setOsVersionSupported(
        isVersionGreater(osVersion, lowestSupportedOsVersion)
      )
    } catch (error) {
      logger.error(`Overview: ${error.message}`)
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

  const closeUpdatingForceModalFlow = async () => {
    setUpdateState(UpdatingState.Standby)
  }

  const isPureOsAvailable = (): boolean => {
    try {
      if (!osVersion || !lastAvailableOsVersion) {
        return false
      } else {
        return !isVersionGreater(osVersion, lastAvailableOsVersion)
      }
    } catch (error) {
      logger.error(`Overview (isPureOsAvailable): ${error.message}`)
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
    } else if (!osVersionSupported && contactSupportOpenState === undefined) {
      return UpdatingForceModalFlowState.Info
    } else {
      return undefined
    }
  }

  return (
    <>
      <UpdatingForceModalFlow
        state={getUpdatingForceModalFlowState()}
        updateOs={startUpdateOs}
        osVersion={osVersion}
        closeModal={closeUpdatingForceModalFlow}
        onContact={openContactSupportModalFlow}
        onHelp={goToHelp}
      />
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
      <OverviewContent
        batteryLevel={batteryLevel}
        changeSim={changeSim}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        osUpdateDate={osUpdateDate}
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
      />
    </>
  )
}

export default Overview

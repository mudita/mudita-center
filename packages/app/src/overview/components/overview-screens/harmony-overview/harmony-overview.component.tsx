/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceType } from "@mudita/pure"
import { HelpActions } from "Common/enums/help-actions.enum"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { UpdatingState } from "Renderer/models/basic-info/basic-info.typings"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import React, { useEffect, useState } from "react"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { noop } from "Renderer/utils/noop"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { SettingsState } from "App/main/store/settings.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/main/utils/logger"
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

export type HarmonyOverviewProps = DeviceState["data"] &
  PhoneUpdateStore &
  SettingsState &
  DevMode

export const HarmonyOverview: FunctionComponent<HarmonyOverviewProps> = ({
  batteryLevel = 0,
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
  lowestSupportedOsVersion = "",
  updatingState,
  startUpdateOs,
  setUpdateState,
  serialNumber,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [osVersionSupported, setOsVersionSupported] = useState(true)
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

  const { release, initialCheck, check, download, install } =
    useSystemUpdateFlow(
      osVersion,
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
      logger.error(`Overview: ${(error as Error).message}`)
    }
  }, [osVersion, lowestSupportedOsVersion])

  useEffect(() => {
    if (osVersion) {
      initialCheck()
    }
  }, [osVersion])

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
    } else if (!osVersionSupported && contactSupportOpenState === undefined) {
      return UpdatingForceModalFlowState.Info
    } else {
      return undefined
    }
  }

  return (
    <>
      <UpdatingForceModalFlow
        deviceType={DeviceType.MuditaHarmony}
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
      <OverviewContent
        deviceType={DeviceType.MuditaHarmony}
        batteryLevel={batteryLevel}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        osUpdateDate={osUpdateDate}
        memorySpace={memorySpace}
        pureOsAvailable={isPureOsAvailable()}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={download}
      />
    </>
  )
}

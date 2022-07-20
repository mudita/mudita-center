/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceType } from "@mudita/pure"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import React, { useEffect, useState } from "react"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/__deprecated__/main/utils/logger"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import UpdatingForceModalFlow, {
  UpdatingForceModalFlowState,
} from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"

export interface HarmonyOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
  readonly lastAvailableOsVersion: string
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly pureOsDownloaded: boolean
  readonly updatingState: UpdatingState
  readonly serialNumber: string | undefined
  readonly startUpdateOs: (data: string) => void
  readonly setUpdateState: (data: UpdatingState) => void
  readonly updatePhoneOsInfo: (data: PhoneUpdate) => void
  readonly disconnectDevice: () => void
  readonly openContactSupportFlow: () => void
}

export const HarmonyOverview: FunctionComponent<HarmonyOverviewProps> = ({
  batteryLevel = 0,
  disconnectDevice = noop,
  osVersion = "",
  lastAvailableOsVersion,
  pureOsDownloaded,
  updatePhoneOsInfo = noop,
  lowestSupportedOsVersion = "",
  updatingState,
  startUpdateOs,
  setUpdateState,
  openContactSupportFlow,
  serialNumber,
}) => {
  /**
   * Temporary state to demo failure
   */
  const [osVersionSupported, setOsVersionSupported] = useState(true)

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
    } else if (!osVersionSupported) {
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
        onContact={openContactSupportFlow}
        onHelp={goToHelp}
        batteryLevel={batteryLevel}
      />
      <OverviewContent
        deviceType={DeviceType.MuditaHarmony}
        batteryLevel={batteryLevel}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        pureOsAvailable={isPureOsAvailable()}
        pureOsDownloaded={pureOsDownloaded}
        onUpdateCheck={check}
        onUpdateInstall={install}
        onUpdateDownload={download}
      />
    </>
  )
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceType } from "App/device/constants"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React, { useEffect, useState } from "react"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { PhoneUpdate } from "App/__deprecated__/renderer/models/phone-update/phone-update.interface"
import useSystemUpdateFlow from "App/overview/helpers/system-update.hook"
import logger from "App/__deprecated__/main/utils/logger"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import UpdatingForceModalFlow from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { flags, Feature } from "App/feature-flags"
import { State } from "App/core/constants"

export interface HarmonyOverviewProps {
  readonly lowestSupportedOsVersion: string | undefined
  readonly lastAvailableOsVersion: string
  readonly batteryLevel: number | undefined
  readonly osVersion: string | undefined
  readonly pureOsDownloaded: boolean
  readonly updatingState: State | null
  readonly serialNumber: string | undefined
  readonly startUpdateOs: (data: string) => void
  readonly setUpdateState: (data: State) => void
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
      setUpdateState(State.Loading)
    } else {
      setUpdateState(State.Initial)
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
      void initialCheck()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osVersion])

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  const closeUpdatingForceModalFlow = async () => {
    setUpdateState(State.Initial)
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
    if (updatingState === State.Loaded) {
      return UpdatingForceModalFlowState.Success
    } else if (updatingState === State.Failed) {
      return UpdatingForceModalFlowState.Fail
    } else if (updatingState === State.Loading) {
      return UpdatingForceModalFlowState.Updating
    } else if (!osVersionSupported) {
      return UpdatingForceModalFlowState.Info
    } else {
      return undefined
    }
  }

  return (
    <>
      {flags.get(Feature.ForceUpdate) && (
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
      )}
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

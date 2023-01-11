/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { DeviceType } from "App/device/constants"
import { Feature, flags } from "App/feature-flags"
import { HarmonyOverviewProps } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component.interface"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { UpdateOsFlow } from "App/overview/components/update-os-flow"
import UpdatingForceModalFlow from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import isVersionGreaterOrEqual from "App/overview/helpers/is-version-greater-or-equal"
import {
  CheckForUpdateMode,
  SilentCheckForUpdateState,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import logger from "App/__deprecated__/main/utils/logger"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import React, { useEffect, useState } from "react"

export const HarmonyOverview: FunctionComponent<HarmonyOverviewProps> = ({
  batteryLevel = 0,
  disconnectDevice = noop,
  osVersion = "",
  lowestSupportedOsVersion = "",
  updatingState,
  startUpdateOs,
  setUpdateState,
  openContactSupportFlow,
  serialNumber,
  checkingForUpdateState,
  availableReleasesForUpdate,
  downloadingState,
  clearUpdateState,
  abortDownload,
  allReleases,
  updateOsError,
  checkForUpdate,
  downloadUpdates,
  downloadingReleasesProcessStates,
  updatingReleasesProcessStates,
  silentCheckForUpdateState,
  areAllReleasesDownloaded,
}) => {
  const [osVersionSupported, setOsVersionSupported] = useState(true)

  const goToHelp = (): void => {
    void ipcRenderer.callMain(HelpActions.OpenWindow)
  }

  const harmonySilentCheckForUpdate = () =>
    checkForUpdate(DeviceType.MuditaHarmony, CheckForUpdateMode.SilentCheck)

  useEffect(() => {
    try {
      setOsVersionSupported(
        isVersionGreaterOrEqual(osVersion, lowestSupportedOsVersion)
      )
    } catch (error) {
      logger.error(`Overview: ${(error as Error).message}`)
    }
  }, [osVersion, lowestSupportedOsVersion])

  useEffect(() => {
    if (silentCheckForUpdateState === SilentCheckForUpdateState.Initial) {
      harmonySilentCheckForUpdate()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [silentCheckForUpdateState])

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  const closeUpdatingForceModalFlow = async () => {
    setUpdateState(State.Initial)
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

  const updateReleases = (devReleases?: OsRelease[]) => {
    const releasesToInstall = devReleases ?? availableReleasesForUpdate

    releasesToInstall &&
      releasesToInstall.length > 0 &&
      startUpdateOs(releasesToInstall)
  }

  const downloadReleases = (devReleases?: OsRelease[]) => {
    const releasesToDownload = devReleases ?? availableReleasesForUpdate

    releasesToDownload &&
      releasesToDownload.length > 0 &&
      downloadUpdates(releasesToDownload)
  }

  const checkForHarmonyUpdate = () => {
    checkForUpdate(DeviceType.MuditaHarmony, CheckForUpdateMode.Normal)
  }

  const tryAgainHarmonyUpdate = () => {
    checkForUpdate(DeviceType.MuditaHarmony, CheckForUpdateMode.TryAgain)
  }

  return (
    <>
      <UpdateOsFlow
        currentOsVersion={osVersion}
        silentCheckForUpdateState={silentCheckForUpdateState}
        checkForUpdateState={checkingForUpdateState}
        availableReleasesForUpdate={availableReleasesForUpdate}
        downloadState={downloadingState}
        tryAgainCheckForUpdate={tryAgainHarmonyUpdate}
        clearUpdateOsFlow={clearUpdateState}
        downloadUpdates={downloadReleases}
        abortDownloading={abortDownload}
        updateState={updatingState}
        updateOs={updateReleases}
        openContactSupportFlow={openContactSupportFlow}
        allReleases={allReleases}
        openHelpView={goToHelp}
        error={updateOsError}
        downloadingReleasesProcessStates={downloadingReleasesProcessStates}
        updatingReleasesProcessStates={updatingReleasesProcessStates}
      />

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
        pureOsAvailable={(availableReleasesForUpdate ?? []).length > 0}
        checkForUpdatePerformed={
          silentCheckForUpdateState === SilentCheckForUpdateState.Loaded ||
          checkingForUpdateState === State.Loaded
        }
        pureOsDownloaded={areAllReleasesDownloaded}
        onUpdateCheck={checkForHarmonyUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={() => downloadReleases()}
        serialNumber={serialNumber}
        checkForUpdateInProgress={
          silentCheckForUpdateState === SilentCheckForUpdateState.Loading
        }
      />
    </>
  )
}

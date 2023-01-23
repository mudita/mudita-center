/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { DeviceType } from "App/device/constants"
import { Feature, flags } from "App/feature-flags"
import { CheckForUpdateLocalState } from "App/overview/components/overview-screens/constants/overview.enum"
import { HarmonyOverviewProps } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component.interface"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { useUpdateFlowState } from "App/overview/components/overview-screens/helpers/use-update-flow-state.hook"
import { UpdateOsFlow } from "App/overview/components/update-os-flow"
import UpdatingForceModalFlow from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { CheckForUpdateMode } from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import React from "react"

export const HarmonyOverview: FunctionComponent<HarmonyOverviewProps> = ({
  batteryLevel = 0,
  disconnectDevice = noop,
  osVersion = "",
  updatingState,
  startUpdateOs,
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
  setCheckForUpdateState,
  forceUpdateNeeded,
  forceUpdate,
  forceUpdateState,
  closeForceUpdateFlow,
}) => {
  const { checkForUpdateLocalState } = useUpdateFlowState({
    checkingForUpdateState,
    silentCheckForUpdateState,
    checkForUpdate: () =>
      checkForUpdate(DeviceType.MuditaHarmony, CheckForUpdateMode.SilentCheck),
    forceUpdateNeeded,
  })

  const goToHelp = (): void => {
    void ipcRenderer.callMain(HelpActions.OpenWindow)
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

  const openCheckForUpdateModal = () => {
    setCheckForUpdateState(State.Loaded)
  }

  const startForceUpdate = () => {
    const releasesToInstall = availableReleasesForUpdate

    releasesToInstall &&
      releasesToInstall.length > 0 &&
      forceUpdate(releasesToInstall)
  }

  return (
    <>
      <UpdateOsFlow
        deviceType={DeviceType.MuditaHarmony}
        currentOsVersion={osVersion}
        silentCheckForUpdateState={silentCheckForUpdateState}
        checkForUpdateState={checkingForUpdateState}
        availableReleasesForUpdate={availableReleasesForUpdate}
        areAllReleasesDownloaded={areAllReleasesDownloaded}
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
          availableReleasesForUpdate={availableReleasesForUpdate}
          updatingReleasesProcessStates={updatingReleasesProcessStates}
          enabled={forceUpdateNeeded}
          startForceUpdate={startForceUpdate}
          error={updateOsError}
          openHelpView={goToHelp}
          openContactSupportFlow={openContactSupportFlow}
          forceUpdateState={forceUpdateState}
          closeForceUpdateFlow={closeForceUpdateFlow}
        />
      )}

      <OverviewContent
        deviceType={DeviceType.MuditaHarmony}
        batteryLevel={batteryLevel}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        pureOsAvailable={(availableReleasesForUpdate ?? []).length > 0}
        checkForUpdateFailed={
          checkForUpdateLocalState === CheckForUpdateLocalState.Failed
        }
        checkForUpdateInProgress={
          checkForUpdateLocalState ===
          CheckForUpdateLocalState.SilentCheckLoading
        }
        checkForUpdatePerformed={
          checkForUpdateLocalState === CheckForUpdateLocalState.Loaded
        }
        pureOsDownloaded={areAllReleasesDownloaded}
        onUpdateCheck={checkForHarmonyUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={openCheckForUpdateModal}
        serialNumber={serialNumber}
      />
    </>
  )
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { Feature, flags } from "App/feature-flags"
import { HarmonyOverviewProps } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component.interface"
import OverviewContent from "App/overview/components/overview-screens/harmony-overview/overview-content.component"
import { UpdateOsFlow } from "App/overview/components/update-os-flow"
import UpdatingForceModalFlow from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { CheckForUpdateMode } from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ipcRenderer } from "electron-better-ipc"
import React from "react"
import { CheckForUpdateState } from "App/update/constants/check-for-update-state.constant"

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
    setCheckForUpdateState(CheckForUpdateState.Loaded)
  }

  const startForceUpdate = () => {
    const releasesToInstall = availableReleasesForUpdate

    releasesToInstall &&
      releasesToInstall.length > 0 &&
      forceUpdate(releasesToInstall)
  }

  return (
    <>
      {!forceUpdateNeeded && (
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
      )}

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
        batteryLevel={batteryLevel}
        disconnectDevice={disconnectDevice}
        osVersion={osVersion}
        onUpdateCheck={checkForHarmonyUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={openCheckForUpdateModal}
        serialNumber={serialNumber}
      />
    </>
  )
}

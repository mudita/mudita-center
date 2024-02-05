/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device/constants"
import { Feature, flags } from "Core/feature-flags"
import { HarmonyOverviewProps } from "Core/overview/components/overview-screens/harmony-overview/harmony-overview.component.interface"
import OverviewContent from "Core/overview/components/overview-screens/harmony-overview/overview-content.component"
import { UpdateOsFlow } from "Core/overview/components/update-os-flow"
import UpdatingForceModalFlow from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { CheckForUpdateMode } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ipcRenderer } from "electron-better-ipc"
import React from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { useWatchDeviceDataEffect } from "Core/overview/components/overview-screens/helpers/use-watch-device-data-effect"

export const HarmonyOverview: FunctionComponent<HarmonyOverviewProps> = ({
  batteryLevel = 0,
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
  caseColour,
}) => {
  useWatchDeviceDataEffect()
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
        osVersion={osVersion}
        onUpdateCheck={checkForHarmonyUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={openCheckForUpdateModal}
        serialNumber={serialNumber}
        caseColour={caseColour}
      />
    </>
  )
}

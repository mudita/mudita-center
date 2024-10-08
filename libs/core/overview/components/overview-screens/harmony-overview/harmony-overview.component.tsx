/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { Feature, flags } from "Core/feature-flags"
import { HarmonyOverviewProps } from "Core/overview/components/overview-screens/harmony-overview/harmony-overview.component.interface"
import HarmonyOverviewContent from "Core/overview/components/overview-screens/harmony-overview/harmony-overview-content.component"
import { UpdateOsFlow } from "Core/overview/components/update-os-flow"
import UpdatingForceModalFlow from "Core/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { CheckForUpdateMode } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React from "react"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { useWatchDeviceDataEffect } from "Core/overview/components/overview-screens/helpers/use-watch-device-data-effect"
import { useSelector } from "react-redux"
import { selectDeviceErrorModalOpened } from "generic-view/store"
import { useHelpShortcut } from "help/store"

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
  synchronizeTime,
}) => {
  const openHelpShortcut = useHelpShortcut()
  const genericDeviceErrorModalOpened = useSelector(
    selectDeviceErrorModalOpened
  )
  useWatchDeviceDataEffect()
  const goToHelp = (): void => {
    openHelpShortcut("harmony-os-update-fail")
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

  const synchronizeHarmonyTime = () => {
    synchronizeTime()
  }

  return (
    <>
      {!genericDeviceErrorModalOpened && (
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
              openHelpView={goToHelp}
              error={updateOsError}
              downloadingReleasesProcessStates={
                downloadingReleasesProcessStates
              }
              updatingReleasesProcessStates={updatingReleasesProcessStates}
            />
          )}

          {flags.get(Feature.ForceUpdate) && (
            <UpdatingForceModalFlow
              deviceType={DeviceType.MuditaHarmony}
              availableReleasesForUpdate={availableReleasesForUpdate}
              checkForUpdateState={checkingForUpdateState}
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
        </>
      )}
      <HarmonyOverviewContent
        batteryLevel={batteryLevel}
        osVersion={osVersion}
        onUpdateCheck={checkForHarmonyUpdate}
        onUpdateInstall={() => updateReleases()}
        onUpdateDownload={openCheckForUpdateModal}
        serialNumber={serialNumber}
        caseColour={caseColour}
        synchronizeTime={synchronizeHarmonyTime}
      />
    </>
  )
}

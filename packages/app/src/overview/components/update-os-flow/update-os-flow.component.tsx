/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { UpdateOsFlowTestIds } from "App/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { UpdateOsFlowProps } from "App/overview/components/update-os-flow/update-os-flow.component.interface"
import { CheckForUpdateFailedModal } from "App/overview/components/update-os-modals/check-for-update-failed-modal"
import { CheckingUpdatesModal } from "App/overview/components/update-os-modals/checking-updates-modal"
import { DevUpdateModal } from "App/overview/components/update-os-modals/dev-update-modal"
import { DownloadingUpdateFailedModal } from "App/overview/components/update-os-modals/downloading-update-failed-modal"
import { DownloadingUpdateFinishedModal } from "App/overview/components/update-os-modals/downloading-update-finished-modal"
import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { DownloadingUpdateModal } from "App/overview/components/update-os-modals/downloading-update-modal"
import { TooLowBatteryModal } from "App/overview/components/update-os-modals/too-low-battery-modal"
import { UpdateAvailableModal } from "App/overview/components/update-os-modals/update-available-modal"
import { UpdateNotAvailableModal } from "App/overview/components/update-os-modals/update-not-available-modal"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdatingSpinnerModal } from "App/overview/components/update-os-modals/updating-spinner-modal"
import { UpdatingSuccessModal } from "App/overview/components/update-os-modals/updating-success-modal"
import { useDevUpdate, useDownloadProgress } from "App/overview/hooks"
import {
  DownloadState,
  OsReleaseType,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { cancelOsDownload } from "App/update/requests"
import React, { FunctionComponent, useMemo } from "react"
import { NotEnoughSpaceModal } from "App/overview/components/update-os-modals/not-enough-space-modal"
import { OnboardingNotCompleteModal } from "App/overview/components/onboarding-not-complete-modal"

export const UpdateOsFlow: FunctionComponent<UpdateOsFlowProps> = ({
  checkForUpdateState,
  downloadState,
  availableReleasesForUpdate,
  silentCheckForUpdateState,
  currentOsVersion,
  downloadUpdates,
  clearUpdateOsFlow,
  abortDownloading,
  updateOs,
  updateState,
  openContactSupportFlow,
  allReleases,
  openHelpView,
  error,
  downloadingReleasesProcessStates,
  updatingReleasesProcessStates,
  tryAgainCheckForUpdate,
  areAllReleasesDownloaded,
  deviceType,
}) => {
  const {
    devRelease,
    downloadDevUpdate,
    startDevUpdate,
    closeDevModal,
    canShowDownloadVersion,
    canShowInstallVersion,
  } = useDevUpdate({
    allReleases,
    downloadUpdates,
    updateOs,
    clearUpdateOsFlow,
    downloadState,
    updateState,
  })

  const { downloadProgress, resetDownloadProgress } = useDownloadProgress()

  const resetUpdateFlow = () => {
    clearUpdateOsFlow()
    resetDownloadProgress()
    if (devRelease) {
      closeDevModal()
    }
  }

  const onOsDownloadCancel = () => {
    cancelOsDownload()
    abortDownloading()
  }

  const currentlyDownloadedReleaseIndex = useMemo(() => {
    return (downloadingReleasesProcessStates ?? []).findIndex(
      (item) => item.state === ReleaseProcessState.InProgress
    )
  }, [downloadingReleasesProcessStates])

  const currentlyInstalledReleaseIndex = useMemo(() => {
    return (updatingReleasesProcessStates ?? []).findIndex(
      (item) => item.state === ReleaseProcessState.InProgress
    )
  }, [updatingReleasesProcessStates])

  const alreadyDownloadedReleases = useMemo(() => {
    return (downloadingReleasesProcessStates ?? [])
      .filter((item) => item.state === ReleaseProcessState.Done)
      .map((item) => item.release)
  }, [downloadingReleasesProcessStates])

  return (
    <>
      <CheckingUpdatesModal
        testId={UpdateOsFlowTestIds.CheckForUpdateModal}
        open={checkForUpdateState === State.Loading}
      />
      {availableReleasesForUpdate && availableReleasesForUpdate.length > 0 && (
        <UpdateAvailableModal
          testId={UpdateOsFlowTestIds.UpdateAvailableModal}
          open={checkForUpdateState === State.Loaded}
          releases={availableReleasesForUpdate}
          onDownload={downloadUpdates}
          onClose={resetUpdateFlow}
          areAllReleasesDownloaded={areAllReleasesDownloaded}
          onUpdate={updateOs}
        />
      )}
      {(!availableReleasesForUpdate ||
        availableReleasesForUpdate.length === 0) && (
        <UpdateNotAvailableModal
          testId={UpdateOsFlowTestIds.UpdateNotAvailableModal}
          open={checkForUpdateState === State.Loaded}
          version={currentOsVersion}
          onClose={resetUpdateFlow}
        />
      )}

      <CheckForUpdateFailedModal
        testId={UpdateOsFlowTestIds.CheckForUpdateFailedModal}
        open={
          checkForUpdateState === State.Failed ||
          silentCheckForUpdateState === SilentCheckForUpdateState.Failed
        }
        onClose={resetUpdateFlow}
        onContactSupport={openContactSupportFlow}
        onTryAgain={tryAgainCheckForUpdate}
      />

      {downloadingReleasesProcessStates &&
        currentlyDownloadedReleaseIndex >= 0 && (
          <DownloadingUpdateModal
            testId={UpdateOsFlowTestIds.DownloadingUpdateModal}
            open={downloadState === DownloadState.Loading}
            percent={downloadProgress?.percent ?? 0}
            onCancel={onOsDownloadCancel}
            currentlyDownloadingReleaseOrder={
              currentlyDownloadedReleaseIndex + 1
            }
            currentlyDownloadingReleaseVersion={
              downloadingReleasesProcessStates[currentlyDownloadedReleaseIndex]
                .release.version
            }
            downloadedReleasesSize={downloadingReleasesProcessStates.length}
          />
        )}

      <DownloadingUpdateInterruptedModal
        testId={UpdateOsFlowTestIds.DownloadingCancelledModal}
        open={downloadState === DownloadState.Cancelled}
        onClose={resetUpdateFlow}
        alreadyDownloadedReleases={alreadyDownloadedReleases}
      />
      <DownloadingUpdateFailedModal
        testId={UpdateOsFlowTestIds.DownloadingInterruptedModal}
        open={
          downloadState === DownloadState.Failed &&
          error?.type !== UpdateError.TooLowBattery
        }
        onClose={resetUpdateFlow}
        onGoToHelp={openHelpView}
        onContactSupport={openContactSupportFlow}
      />
      <DownloadingUpdateFinishedModal
        testId={UpdateOsFlowTestIds.DownloadingFinishedModal}
        open={downloadState === DownloadState.Loaded && !devRelease}
        onClose={resetUpdateFlow}
        onOsUpdate={updateOs}
        downloadedReleases={alreadyDownloadedReleases}
      />

      {updatingReleasesProcessStates && currentlyInstalledReleaseIndex >= 0 && (
        <UpdatingSpinnerModal
          testId={UpdateOsFlowTestIds.UpdateInProgressModal}
          open={updateState === State.Loading}
          progressParams={{
            currentlyUpdatingReleaseOrder: currentlyInstalledReleaseIndex + 1,
            currentlyUpdatingReleaseVersion:
              updatingReleasesProcessStates[currentlyInstalledReleaseIndex]
                .release.version,
            updatedReleasesSize: updatingReleasesProcessStates.length,
          }}
        />
      )}

      <UpdatingSuccessModal
        testId={UpdateOsFlowTestIds.UpdateSuccessModal}
        open={updateState === State.Loaded}
        onClose={resetUpdateFlow}
      />
      <UpdatingFailureWithHelpModal
        testId={UpdateOsFlowTestIds.UpdateFailedModal}
        open={
          updateState === State.Failed &&
          error?.type !== UpdateError.TooLowBattery &&
          error?.type !== UpdateError.NotEnoughSpace &&
          error?.type !== UpdateError.OnboardingNotComplete
        }
        onClose={resetUpdateFlow}
        onHelp={openHelpView}
        onContact={openContactSupportFlow}
      />

      <TooLowBatteryModal
        testId={UpdateOsFlowTestIds.TooLowBatteryModal}
        open={error?.type === UpdateError.TooLowBattery}
        deviceType={deviceType}
        onClose={resetUpdateFlow}
      />

      <NotEnoughSpaceModal
        testId={UpdateOsFlowTestIds.NotEnoughSpaceModal}
        open={error?.type === UpdateError.NotEnoughSpace}
        onClose={resetUpdateFlow}
        fileSize={availableReleasesForUpdate?.[0]?.file?.size ?? 0}
      />

      <OnboardingNotCompleteModal
        testId={UpdateOsFlowTestIds.OnboardingNotCompleteModal}
        open={error?.type === UpdateError.OnboardingNotComplete}
        onClose={resetUpdateFlow}
      />

      {devRelease && (
        <DevUpdateModal
          testId={UpdateOsFlowTestIds.DevUpdate}
          open={canShowDownloadVersion || canShowInstallVersion}
          install={canShowInstallVersion}
          date={devRelease.date}
          prerelease={
            devRelease.type === OsReleaseType.Candidate ||
            devRelease.type === OsReleaseType.Daily
          }
          version={devRelease.version}
          action={canShowDownloadVersion ? downloadDevUpdate : startDevUpdate}
          onClose={resetUpdateFlow}
        />
      )}
    </>
  )
}

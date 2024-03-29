/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { UpdateOsFlowTestIds } from "Core/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { UpdateOsFlowProps } from "Core/overview/components/update-os-flow/update-os-flow.component.interface"
import { CheckForUpdateFailedModal } from "Core/overview/components/update-os-modals/check-for-update-failed-modal"
import { CheckingUpdatesModal } from "Core/overview/components/update-os-modals/checking-updates-modal"
import { DownloadingUpdateFailedModal } from "Core/overview/components/update-os-modals/downloading-update-failed-modal"
import { DownloadingUpdateFinishedModal } from "Core/overview/components/update-os-modals/downloading-update-finished-modal"
import { DownloadingUpdateInterruptedModal } from "Core/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { DownloadingUpdateModal } from "Core/overview/components/update-os-modals/downloading-update-modal"
import { TooLowBatteryModal } from "Core/overview/components/update-os-modals/too-low-battery-modal"
import { UpdateAvailableModal } from "Core/overview/components/update-os-modals/update-available-modal"
import { UpdateNotAvailableModal } from "Core/overview/components/update-os-modals/update-not-available-modal"
import { UpdatingFailureWithHelpModal } from "Core/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdatingSpinnerModal } from "Core/overview/components/update-os-modals/updating-spinner-modal"
import { UpdatingSuccessModal } from "Core/overview/components/update-os-modals/updating-success-modal"
import { useDownloadProgress } from "Core/overview/hooks"
import {
  DownloadState,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  UpdateError,
} from "Core/update/constants"
import { cancelOsDownload } from "Core/update/requests"
import React, { FunctionComponent, useMemo } from "react"
import { NotEnoughSpaceModal } from "Core/overview/components/update-os-modals/not-enough-space-modal"
import { OnboardingNotCompleteModal } from "Core/overview/components/onboarding-not-complete-modal"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

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
  openHelpView,
  error,
  downloadingReleasesProcessStates,
  updatingReleasesProcessStates,
  tryAgainCheckForUpdate,
  areAllReleasesDownloaded,
  deviceType,
  layer = ModalLayers.UpdateOS,
}) => {
  const { downloadProgress, resetDownloadProgress } = useDownloadProgress()

  const resetUpdateFlow = () => {
    clearUpdateOsFlow()
    resetDownloadProgress()
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
        layer={layer}
        testId={UpdateOsFlowTestIds.CheckForUpdateModal}
        open={checkForUpdateState === CheckForUpdateState.Loading}
      />
      {availableReleasesForUpdate && availableReleasesForUpdate.length > 0 && (
        <UpdateAvailableModal
          layer={layer}
          testId={UpdateOsFlowTestIds.UpdateAvailableModal}
          open={checkForUpdateState === CheckForUpdateState.Loaded}
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
          layer={layer}
          testId={UpdateOsFlowTestIds.UpdateNotAvailableModal}
          open={checkForUpdateState === CheckForUpdateState.Loaded}
          version={currentOsVersion}
          onClose={resetUpdateFlow}
        />
      )}

      <CheckForUpdateFailedModal
        layer={layer}
        testId={UpdateOsFlowTestIds.CheckForUpdateFailedModal}
        open={
          checkForUpdateState === CheckForUpdateState.Failed ||
          silentCheckForUpdateState === SilentCheckForUpdateState.Failed
        }
        onClose={resetUpdateFlow}
        onContactSupport={openContactSupportFlow}
        onTryAgain={tryAgainCheckForUpdate}
      />

      {downloadingReleasesProcessStates &&
        currentlyDownloadedReleaseIndex >= 0 && (
          <DownloadingUpdateModal
            layer={layer}
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
        layer={layer}
        testId={UpdateOsFlowTestIds.DownloadingCancelledModal}
        open={downloadState === DownloadState.Cancelled}
        onClose={resetUpdateFlow}
        alreadyDownloadedReleases={alreadyDownloadedReleases}
      />
      <DownloadingUpdateFailedModal
        layer={layer}
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
        layer={layer}
        testId={UpdateOsFlowTestIds.DownloadingFinishedModal}
        open={downloadState === DownloadState.Loaded}
        onClose={resetUpdateFlow}
        onOsUpdate={updateOs}
        downloadedReleases={alreadyDownloadedReleases}
      />

      {updatingReleasesProcessStates && currentlyInstalledReleaseIndex >= 0 && (
        <UpdatingSpinnerModal
          layer={layer}
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
        layer={layer}
        testId={UpdateOsFlowTestIds.UpdateSuccessModal}
        open={updateState === State.Loaded}
        onClose={resetUpdateFlow}
      />
      <UpdatingFailureWithHelpModal
        layer={layer}
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
        layer={layer}
        testId={UpdateOsFlowTestIds.TooLowBatteryModal}
        open={error?.type === UpdateError.TooLowBattery}
        deviceType={deviceType}
        onClose={resetUpdateFlow}
      />

      <NotEnoughSpaceModal
        layer={layer}
        testId={UpdateOsFlowTestIds.NotEnoughSpaceModal}
        open={error?.type === UpdateError.NotEnoughSpace}
        onClose={resetUpdateFlow}
        fileSize={availableReleasesForUpdate?.[0]?.file?.size ?? 0}
      />

      <OnboardingNotCompleteModal
        layer={layer}
        testId={UpdateOsFlowTestIds.OnboardingNotCompleteModal}
        open={error?.type === UpdateError.OnboardingNotComplete}
        onClose={resetUpdateFlow}
      />
    </>
  )
}

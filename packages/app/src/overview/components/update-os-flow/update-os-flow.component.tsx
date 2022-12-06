/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { DeviceType } from "App/device"
import { UpdateOsFlowTestIds } from "App/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { UpdateOsFlowProps } from "App/overview/components/update-os-flow/update-os-flow.component.interface"
import { CheckingUpdatesModal } from "App/overview/components/update-os-modals/checking-updates-modal"
import { DevUpdateModal } from "App/overview/components/update-os-modals/dev-update-modal"
import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { DownloadingUpdateFinishedModal } from "App/overview/components/update-os-modals/downloading-update-finished-modal"
import { DownloadingUpdateFailedModal } from "App/overview/components/update-os-modals/downloading-update-failed-modal"
import { DownloadingUpdateModal } from "App/overview/components/update-os-modals/downloading-update-modal"
import { TooLowBatteryModal } from "App/overview/components/update-os-modals/too-low-battery-modal"
import { UpdateAvailableModal } from "App/overview/components/update-os-modals/update-available-modal"
import { UpdateNotAvailableModal } from "App/overview/components/update-os-modals/update-not-available-modal"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdatingSpinnerModal } from "App/overview/components/update-os-modals/updating-spinner-modal"
import { UpdatingSuccessModal } from "App/overview/components/update-os-modals/updating-success-modal"
import { useDevUpdate, useDownloadProgress } from "App/overview/hooks"
import { DownloadState, OsReleaseType, UpdateError } from "App/update/constants"
import { cancelOsDownload } from "App/update/requests"
import React, { FunctionComponent } from "react"

export const UpdateOsFlow: FunctionComponent<UpdateOsFlowProps> = ({
  checkForUpdateState,
  downloadState,
  availableReleasesForUpdate,
  currentOsVersion,
  downloadUpdate,
  clearUpdateOsFlow,
  abortDownloading,
  updateOs,
  updateState,
  openContactSupportFlow,
  allReleases,
  openHelpView,
  error,
  silentUpdateCheck,
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
    downloadUpdate,
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

  return (
    <>
      {!silentUpdateCheck && (
        <>
          <CheckingUpdatesModal
            testId={UpdateOsFlowTestIds.CheckForUpdateModal}
            open={checkForUpdateState === State.Loading}
          />
          {availableReleasesForUpdate &&
            availableReleasesForUpdate.length > 0 && (
              <UpdateAvailableModal
                testId={UpdateOsFlowTestIds.UpdateAvailableModal}
                open={checkForUpdateState === State.Loaded}
                releases={availableReleasesForUpdate}
                onDownload={downloadUpdate}
                onClose={resetUpdateFlow}
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
        </>
      )}

      <DownloadingUpdateModal
        testId={UpdateOsFlowTestIds.DownloadingUpdateModal}
        open={downloadState === DownloadState.Loading}
        percent={downloadProgress?.percent ?? 0}
        speed={downloadProgress?.speed ?? 0}
        timeLeft={downloadProgress?.timeLeft}
        onCancel={onOsDownloadCancel}
      />
      <DownloadingUpdateInterruptedModal
        testId={UpdateOsFlowTestIds.DownloadingCancelledModal}
        open={downloadState === DownloadState.Cancelled}
        onClose={resetUpdateFlow}
        alreadyDownloadedReleases={[]}
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
        downloadedReleases={[]}
      />

      <UpdatingSpinnerModal
        testId={UpdateOsFlowTestIds.UpdateInProgressModal}
        open={updateState === State.Loading}
      />
      <UpdatingSuccessModal
        testId={UpdateOsFlowTestIds.UpdateSuccessModal}
        open={updateState === State.Loaded}
        onClose={resetUpdateFlow}
      />
      <UpdatingFailureWithHelpModal
        testId={UpdateOsFlowTestIds.UpdateFailedModal}
        open={
          updateState === State.Failed &&
          error?.type !== UpdateError.TooLowBattery
        }
        onClose={resetUpdateFlow}
        onHelp={openHelpView}
        onContact={openContactSupportFlow}
      />

      <TooLowBatteryModal
        testId={UpdateOsFlowTestIds.TooLowBatteryModal}
        open={error?.type === UpdateError.TooLowBattery}
        deviceType={DeviceType.MuditaPure}
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

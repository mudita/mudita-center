/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useMemo, useState } from "react"
import { State } from "App/core/constants"
import { ForceUpdateAvailableModal } from "App/overview/components/update-os-modals/force-update-available-modal"
import { TooLowBatteryModal } from "App/overview/components/update-os-modals/too-low-battery-modal"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdatingSpinnerModal } from "App/overview/components/update-os-modals/updating-spinner-modal"
import { UpdatingSuccessModal } from "App/overview/components/update-os-modals/updating-success-modal"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.enum"
import { UpdatingForceModalFlowProps } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import { ReleaseProcessState, UpdateError } from "App/update/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { NotEnoughSpaceModal } from "App/overview/components/update-os-modals/not-enough-space-modal"
import { UpdateOsFlowTestIds } from "App/overview/components/update-os-flow/update-os-flow-test-ids.enum"
import { OnboardingNotCompleteModal } from "App/overview/components/onboarding-not-complete-modal"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"

const UpdatingForceModalFlow: FunctionComponent<
  UpdatingForceModalFlowProps
> = ({
  enabled,
  availableReleasesForUpdate,
  updatingReleasesProcessStates,
  startForceUpdate,
  openContactSupportFlow,
  openHelpView,
  error,
  forceUpdateState,
  closeForceUpdateFlow,
  deviceType,
  layer = ModalLayers.UpdateOS,
}) => {
  const [forceUpdateShowModal, setForceUpdateShowModal] =
    useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false)

  useEffect(() => {
    if (
      forceUpdateState === State.Initial &&
      enabled &&
      availableReleasesForUpdate !== null &&
      availableReleasesForUpdate.length > 0
    ) {
      setForceUpdateShowModal(true)
    } else if (forceUpdateState === State.Loading) {
      setShowErrorModal(false)
      setForceUpdateShowModal(false)
      setShowLoadingModal(true)
    } else if (forceUpdateState === State.Loaded) {
      setShowSuccessModal(true)
      setShowLoadingModal(false)
      setShowErrorModal(false)
    } else if (forceUpdateState === State.Failed) {
      setShowErrorModal(true)
      setForceUpdateShowModal(false)
      setShowLoadingModal(false)
    } else {
      setForceUpdateShowModal(false)
      setShowErrorModal(false)
      setShowLoadingModal(false)
    }
  }, [forceUpdateState, enabled, availableReleasesForUpdate])

  const currentlyInstalledReleaseIndex = useMemo(() => {
    return (updatingReleasesProcessStates ?? []).findIndex(
      (item) => item.state === ReleaseProcessState.InProgress
    )
  }, [updatingReleasesProcessStates])

  const canShowInstallProgress =
    updatingReleasesProcessStates &&
    currentlyInstalledReleaseIndex >= 0 &&
    forceUpdateState === State.Loading

  const onCloseErrorModal = () => {
    setShowErrorModal(false)
    setForceUpdateShowModal(true)
  }

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false)
    closeForceUpdateFlow()
  }

  return (
    <>
      <ForceUpdateAvailableModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceInfoModal}
        open={forceUpdateShowModal}
        releases={availableReleasesForUpdate ?? []}
        onUpdate={startForceUpdate}
        layer={layer}
      />

      {availableReleasesForUpdate && availableReleasesForUpdate.length > 0 && (
        <UpdatingSpinnerModal
          layer={layer}
          testId={UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal}
          open={showLoadingModal}
          progressParams={
            canShowInstallProgress
              ? {
                  currentlyUpdatingReleaseOrder:
                    currentlyInstalledReleaseIndex + 1,
                  currentlyUpdatingReleaseVersion:
                    updatingReleasesProcessStates[
                      currentlyInstalledReleaseIndex
                    ].release.version,
                  updatedReleasesSize: updatingReleasesProcessStates.length,
                }
              : {
                  currentlyUpdatingReleaseOrder: 1,
                  currentlyUpdatingReleaseVersion:
                    availableReleasesForUpdate[0].version,
                  updatedReleasesSize: availableReleasesForUpdate.length,
                }
          }
        />
      )}

      <UpdatingFailureWithHelpModal
        layer={layer}
        testId={UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal}
        open={
          showErrorModal &&
          error?.type !== UpdateError.TooLowBattery &&
          error?.type !== UpdateError.NotEnoughSpace &&
          error?.type !== UpdateError.OnboardingNotComplete
        }
        onClose={onCloseErrorModal}
        onHelp={openHelpView}
        onContact={openContactSupportFlow}
      />

      <TooLowBatteryModal
        layer={layer}
        testId={UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal}
        open={showErrorModal && error?.type === UpdateError.TooLowBattery}
        deviceType={deviceType}
        onClose={onCloseErrorModal}
      />

      <NotEnoughSpaceModal
        layer={layer}
        testId={UpdateOsFlowTestIds.NotEnoughSpaceModal}
        open={showErrorModal && error?.type === UpdateError.NotEnoughSpace}
        onClose={onCloseErrorModal}
        fileSize={availableReleasesForUpdate?.[0]?.file?.size ?? 0}
      />

      <OnboardingNotCompleteModal
        layer={layer}
        testId={UpdateOsFlowTestIds.OnboardingNotCompleteModal}
        open={
          showErrorModal && error?.type === UpdateError.OnboardingNotComplete
        }
        onClose={onCloseErrorModal}
      />

      <UpdatingSuccessModal
        layer={layer}
        testId={UpdatingForceModalFlowTestIds.UpdatingSuccessModal}
        open={showSuccessModal}
        onClose={onCloseSuccessModal}
      />
    </>
  )
}

export default UpdatingForceModalFlow

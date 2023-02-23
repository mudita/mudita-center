/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
import React, { useEffect, useMemo, useState } from "react"

const UpdatingForceModalFlow: FunctionComponent<UpdatingForceModalFlowProps> =
  ({
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
  }) => {
    const [forceUpdateShowModal, setForceUpdateShowModal] =
      useState<boolean>(false)
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
    const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false)

    useEffect(() => {
      if (forceUpdateState === State.Initial && enabled) {
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
      }
    }, [forceUpdateState, enabled])

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
        />

        {availableReleasesForUpdate && availableReleasesForUpdate.length > 0 && (
          <UpdatingSpinnerModal
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
          testId={
            UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
          }
          open={showErrorModal && error?.type !== UpdateError.TooLowBattery}
          onClose={onCloseErrorModal}
          onHelp={openHelpView}
          onContact={openContactSupportFlow}
        />

        <TooLowBatteryModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal}
          open={showErrorModal && error?.type === UpdateError.TooLowBattery}
          deviceType={deviceType}
          onClose={onCloseErrorModal}
        />

        <UpdatingSuccessModal
          testId={UpdatingForceModalFlowTestIds.UpdatingSuccessModal}
          open={showSuccessModal}
          onClose={onCloseSuccessModal}
        />
      </>
    )
  }

export default UpdatingForceModalFlow

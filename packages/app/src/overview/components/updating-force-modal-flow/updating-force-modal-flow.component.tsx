/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import {
  ApplicationUpdateError,
  ApplicationUpdateErrorCodeMap,
} from "App/overview/components/updating-force-modal-flow/no-critical-errors-codes.const"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.enum"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { UpdatingForceModalFlowProps } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import isVersionGreaterOrEqual from "App/overview/helpers/is-version-greater-or-equal"
import logger from "App/__deprecated__/main/utils/logger"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  downloadOsUpdateRequest,
  getLatestReleaseRequest,
} from "App/update/requests"
import { Release } from "App/update/dto"
import { Product } from "App/update/constants"
import React, { useEffect, useState } from "react"
import { UpdatingSpinnerModal } from "App/overview/components/update-os-modals/updating-spinner-modal"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdatingSuccessModal } from "App/overview/components/update-os-modals/updating-success-modal"
import { TooLowBatteryModal } from "App/overview/components/update-os-modals/too-low-battery-modal"
import { UpdatingForceModal } from "App/overview/components/update-os-modals/update-force-modal"

const UpdatingForceModalFlow: FunctionComponent<UpdatingForceModalFlowProps> =
  ({
    state,
    osVersion,
    onContact,
    onHelp,
    closeModal,
    updateOs,
    deviceType,
    batteryLevel,
  }) => {
    const [updatingForceOpenState, setUpdatingForceOpenState] =
      useState<UpdatingForceModalFlowState | undefined>(state)
    const minBattery = 40
    const notEnoughBattery = Math.round(batteryLevel * 100) <= minBattery
    useEffect(() => {
      setUpdatingForceOpenState(state)
    }, [state])

    const runUpdateProcess = async () => {
      if (osVersion === undefined) {
        handleUpdateOsFailed(
          ApplicationUpdateErrorCodeMap[
            ApplicationUpdateError.UnableReadOSVersion
          ]
        )
        return
      }

      if (notEnoughBattery) {
        setUpdatingForceOpenState(UpdatingForceModalFlowState.TooLowBattery)
        return
      }

      setUpdatingForceOpenState(UpdatingForceModalFlowState.Updating)

      const latestRelease = await getLatestReleaseRequest(
        deviceType === DeviceType.MuditaPure
          ? Product.PurePhone
          : Product.BellHybrid
      )
      const newestPureOsAvailable = isNewestPureOsAvailable(
        osVersion,
        latestRelease.data?.version
      )

      if (!newestPureOsAvailable || !latestRelease) {
        handleUpdateOsFailed(
          ApplicationUpdateErrorCodeMap[
            ApplicationUpdateError.FetchReleaseFromGithub
          ]
        )
        return
      }

      if (latestRelease.ok && latestRelease.data) {
        const downloadOSSuccess = await downloadOS(latestRelease.data)

        if (!downloadOSSuccess) {
          handleUpdateOsFailed(
            ApplicationUpdateErrorCodeMap[ApplicationUpdateError.DownloadOS]
          )
          return
        }

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await updateOs(latestRelease.data.file.name)
      }
    }

    const handleUpdateOsFailed = (code?: number): void => {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      logger.error(`Overview: force updating pure fails. Code: ${code}`)
    }

    const isNewestPureOsAvailable = (
      osVersion: string,
      latestReleaseVersion?: string
    ): boolean => {
      try {
        return latestReleaseVersion
          ? !isVersionGreaterOrEqual(osVersion, latestReleaseVersion)
          : false
      } catch (error) {
        logger.error(
          `Overview: force updating pure. Check that isNewestPureOsAvailable fails ${
            (error as Error).message
          }`
        )
        return false
      }
    }

    const downloadOS = async (release: Release): Promise<boolean> => {
      const response = await downloadOsUpdateRequest({
        url: release.file.url,
        fileName: release.file.name,
      })

      return response.ok
    }

    const backToInfoModal = (): void => {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Info)
    }

    return (
      <>
        <UpdatingForceModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceInfoModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Info}
          onActionButtonClick={runUpdateProcess}
        />
        <TooLowBatteryModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceTooLowBatteryModal}
          open={
            updatingForceOpenState === UpdatingForceModalFlowState.TooLowBattery
          }
          onClose={backToInfoModal}
          deviceType={deviceType}
        />
        <UpdatingSpinnerModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Updating}
        />
        <UpdatingFailureWithHelpModal
          testId={
            UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal
          }
          onContact={onContact}
          onHelp={onHelp}
          onClose={backToInfoModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Fail}
        />
        <UpdatingSuccessModal
          testId={UpdatingForceModalFlowTestIds.UpdatingSuccessModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Success}
          onClose={closeModal}
        />
      </>
    )
  }

export default UpdatingForceModalFlow

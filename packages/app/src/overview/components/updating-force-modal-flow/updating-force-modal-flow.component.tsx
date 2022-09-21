/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import {
  TooLowBatteryModal,
  UpdatingFailureWithHelpModal,
  UpdatingForceModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "App/overview/components/overview.modal-dialogs"
import {
  ApplicationUpdateError,
  ApplicationUpdateErrorCodeMap,
} from "App/overview/components/updating-force-modal-flow/no-critical-errors-codes.const"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.component"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { UpdatingForceModalFlowProps } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import logger from "App/__deprecated__/main/utils/logger"
import { DownloadStatus } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { downloadOsUpdateRequest } from "App/__deprecated__/update"
import { getLatestReleaseRequest } from "App/update/requests"
import { Release } from "App/update/dto"
import { Product } from "App/update/constants"
import React, { useEffect, useState } from "react"

const UpdatingForceModalFlow: FunctionComponent<
  UpdatingForceModalFlowProps
> = ({
  state,
  osVersion,
  onContact,
  onHelp,
  closeModal,
  updateOs,
  deviceType,
  batteryLevel,
}) => {
  const [updatingForceOpenState, setUpdatingForceOpenState] = useState<
    UpdatingForceModalFlowState | undefined
  >(state)
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
        ? !isVersionGreater(osVersion, latestReleaseVersion)
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
    try {
      const response = await downloadOsUpdateRequest({
        url: release.file.url,
        fileName: release.file.name,
      })
      return response.status === DownloadStatus.Completed
    } catch {
      return false
    }
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
        onCancel={backToInfoModal}
        deviceType={deviceType}
      />
      <UpdatingSpinnerModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Updating}
      />
      <UpdatingFailureWithHelpModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal}
        onContact={onContact}
        onHelp={onHelp}
        closeModal={backToInfoModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Fail}
      />
      <UpdatingSuccessModal
        testId={UpdatingForceModalFlowTestIds.UpdatingSuccessModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Success}
        closeModal={closeModal}
      />
    </>
  )
}

export default UpdatingForceModalFlow

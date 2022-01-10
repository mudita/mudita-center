/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import React, { ComponentProps, useEffect, useState } from "react"
import logger from "App/main/utils/logger"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Release } from "App/main/functions/register-get-all-releases-listener"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import {
  TooLowBatteryModal,
  UpdatingForceModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
  UpdatingFailureWithHelpModal,
} from "App/overview/components/overview.modal-dialogs"
import getAllReleases from "Renderer/requests/get-all-releases.request"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"
import { DownloadStatus } from "Renderer/interfaces/file-download.interface"
import {
  ApplicationUpdateError,
  ApplicationUpdateErrorCodeMap,
} from "App/overview/components/updating-force-modal-flow/no-critical-errors-codes.const"
import { UpdatingForceModalFlowTestIds } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow-test-ids.component"

export enum UpdatingForceModalFlowState {
  Info = "Info",
  TooLowBattery = "too-low-battery",
  Updating = "updating",
  Success = "success",
  Fail = "fail",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  state: UpdatingForceModalFlowState | undefined
  osVersion: string | undefined
  onContact: () => void
  onHelp: () => void
  updateOs: (fileName: string) => void
  deviceType: DeviceType
  batteryLevel: number
}

const UpdatingForceModalFlow: FunctionComponent<Props> = ({
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

    const { latestRelease } = await getAllReleases(deviceType)
    const newestPureOsAvailable = isNewestPureOsAvailable(
      osVersion,
      latestRelease?.version
    )

    if (!newestPureOsAvailable || !latestRelease) {
      handleUpdateOsFailed(
        ApplicationUpdateErrorCodeMap[
          ApplicationUpdateError.FetchReleaseFromGithub
        ]
      )
      return
    }

    const downloadOSSuccess = await downloadOS(latestRelease)

    if (!downloadOSSuccess) {
      handleUpdateOsFailed(
        ApplicationUpdateErrorCodeMap[ApplicationUpdateError.DownloadOS]
      )
      return
    }

    await updateOs(latestRelease.file.name)
  }

  const handleUpdateOsFailed = (code?: number): void => {
    setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import logger from "App/main/utils/logger"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Release } from "App/main/functions/register-get-all-releases-listener"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import {
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
}

const UpdatingForceModalFlow: FunctionComponent<Props> = ({
  state,
  osVersion,
  onContact,
  onHelp,
  closeModal,
  updateOs,
}) => {
  const [updatingForceOpenState, setUpdatingForceOpenState] = useState<
    UpdatingForceModalFlowState | undefined
  >(state)

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

    setUpdatingForceOpenState(UpdatingForceModalFlowState.Updating)

    const { latestRelease } = await getAllReleases()
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
      logger.error(`Overview: force updating pure. Check that isNewestPureOsAvailable fails ${error.message}`)
      return false
    }
  }

  const downloadOS = async (release: Release): Promise<boolean> => {
    try {
      const response = await downloadOsUpdateRequest(release.file.url)
      return response.status === DownloadStatus.Completed
    } catch {
      return false
    }
  }

  const closeFailureModal = (): void => {
    setUpdatingForceOpenState(UpdatingForceModalFlowState.Info)
  }

  return (
    <>
      <UpdatingForceModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceInfoModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Info}
        onActionButtonClick={runUpdateProcess}
      />
      <UpdatingSpinnerModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceSpinnerModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Updating}
      />
      <UpdatingFailureWithHelpModal
        testId={UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal}
        onContact={onContact}
        onHelp={onHelp}
        closeModal={closeFailureModal}
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

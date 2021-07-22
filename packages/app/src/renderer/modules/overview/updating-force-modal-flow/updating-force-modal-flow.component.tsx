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
  UpdatingFailureModal,
  UpdatingSuccessModal,
  UpdatingFailureWithHelpModal,
} from "Renderer/modules/overview/overview.modal-dialogs"
import getAllReleases from "Renderer/requests/get-all-releases.request"
import isVersionGreater from "Renderer/modules/overview/is-version-greater"
import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"
import { DownloadStatus } from "Renderer/interfaces/file-download.interface"
import updateOs from "Renderer/requests/update-os.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import {
  ApplicationUpdateError,
  ApplicationUpdateErrorCodeMap,
  noCriticalErrorCodes,
} from "Renderer/modules/overview/updating-force-modal-flow/no-critical-errors-codes.const"
import { UpdatingForceModalFlowTestIds } from "Renderer/modules/overview/updating-force-modal-flow/updating-force-modal-flow-test-ids.component"

export enum UpdatingForceModalFlowState {
  Info = "Info",
  Updating = "updating",
  Success = "success",
  Fail = "fail",
}

interface Props extends ComponentProps<typeof ModalDialog> {
  osVersion: string | undefined
  onContact: (code?: number) => void
  onHelp: (code: number) => void
}

const UpdatingForceModalFlow: FunctionComponent<Props> = ({
  open,
  osVersion,
  onContact,
  onHelp,
  closeModal,
}) => {
  const [
    updatingForceOpenState,
    setUpdatingForceOpenState,
  ] = useState<UpdatingForceModalFlowState>()
  const [code, setCode] = useState<number>()

  useEffect(() => {
    if (open) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Info)
    } else {
      setUpdatingForceOpenState(undefined)
    }
  }, [open])

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

    const response = await updateOs(latestRelease.file.name)

    if (response.status !== DeviceResponseStatus.Ok) {
      handleUpdateOsFailed(response.error?.code)
      return
    }

    setUpdatingForceOpenState(UpdatingForceModalFlowState.Success)
  }

  const handleUpdateOsFailed = (code?: number): void => {
    setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
    setCode(code)
    logger.error(`Overview: force updating pure fails. Code: ${code}`)
  }

  const isNewestPureOsAvailable = (
    osVersion: string,
    latestReleaseVersion?: string
  ): boolean => {
    return latestReleaseVersion
      ? !isVersionGreater(osVersion, latestReleaseVersion)
      : false
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
      {code && noCriticalErrorCodes.includes(code) ? (
        <UpdatingFailureWithHelpModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceFailureWithHelpModal}
          code={code}
          onContact={onContact}
          onHelp={onHelp}
          closeModal={closeFailureModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Fail}
        />
      ) : (
        <UpdatingFailureModal
          testId={UpdatingForceModalFlowTestIds.UpdatingForceFailureModal}
          onContact={onContact}
          closeModal={closeFailureModal}
          open={updatingForceOpenState === UpdatingForceModalFlowState.Fail}
        />
      )}
      <UpdatingSuccessModal
        testId={UpdatingForceModalFlowTestIds.UpdatingSuccessModal}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Success}
        closeModal={closeModal}
      />
    </>
  )
}

export default UpdatingForceModalFlow

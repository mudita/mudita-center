/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Release } from "App/main/functions/register-get-all-releases-listener"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import {
  UpdatingForceModal,
  UpdatingSpinnerModal,
  UpdatingFailureModal,
  UpdatingSuccessModal,
} from "Renderer/modules/overview/overview.modal-dialogs"
import getAllReleases from "Renderer/requests/get-all-releases.request"
import isVersionGreater from "Renderer/modules/overview/is-version-greater"
import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"
import { DownloadStatus } from "Renderer/interfaces/file-download.interface"
import updateOs from "Renderer/requests/update-os.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export enum UpdatingForceModalFlowState {
  Info = "Info",
  Updating = "updating",
  Success = "success",
  Fail = "fail",
}

interface Props extends ComponentProps<typeof ModalDialog> {
  osVersion: string | undefined
  onContact: () => void
}

const UpdatingForceModalFlow: FunctionComponent<Props> = ({
  open,
  osVersion,
  onContact,
  closeModal,
}) => {
  const [
    updatingForceOpenState,
    setUpdatingForceOpenState,
  ] = useState<UpdatingForceModalFlowState>()

  useEffect(() => {
    if (open) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Info)
    } else {
      setUpdatingForceOpenState(undefined)
    }
  }, [open])

  const runUpdateProcess = async () => {
    if (!osVersion) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
      return
    }

    setUpdatingForceOpenState(UpdatingForceModalFlowState.Updating)

    const { latestRelease } = await getAllReleases()
    const newestPureOsAvailable = isNewestPureOsAvailable(
      osVersion,
      latestRelease?.version
    )

    if (!newestPureOsAvailable || !latestRelease) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
      return
    }

    const downloadOSSuccess = await downloadOS(latestRelease)

    if (!downloadOSSuccess) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
      return
    }

    const response = await updateOs(latestRelease.file.name)

    if (response.status !== DeviceResponseStatus.Ok) {
      setUpdatingForceOpenState(UpdatingForceModalFlowState.Fail)
      return
    }

    setUpdatingForceOpenState(UpdatingForceModalFlowState.Success)
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

  return (
    <>
      <UpdatingForceModal
        open={updatingForceOpenState === UpdatingForceModalFlowState.Info}
        onActionButtonClick={runUpdateProcess}
      />
      <UpdatingSpinnerModal
        open={updatingForceOpenState === UpdatingForceModalFlowState.Updating}
      />
      <UpdatingFailureModal
        onContact={onContact}
        open={updatingForceOpenState === UpdatingForceModalFlowState.Fail}
      />
      <UpdatingSuccessModal
        open={updatingForceOpenState === UpdatingForceModalFlowState.Success}
        closeModal={closeModal}
      />
    </>
  )
}

export default UpdatingForceModalFlow

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
} from "Renderer/modules/overview/overview.modal-dialogs"
import getAllReleases from "Renderer/requests/get-all-releases.request"
import isVersionGreater from "Renderer/modules/overview/is-version-greater"

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

    updateOS(latestRelease)
  }

  const isNewestPureOsAvailable = (
    osVersion: string,
    latestReleaseVersion?: string
  ): boolean => {
    return latestReleaseVersion
      ? !isVersionGreater(osVersion, latestReleaseVersion)
      : false
  }

  const updateOS = (release: Release) => {
    console.log("updateOS started ", release)
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
    </>
  )
}

export default UpdatingForceModalFlow

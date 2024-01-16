/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { URL_ONBOARDING } from "Core/__deprecated__/renderer/constants/urls"
import { DownloadingUpdateInterruptedModal } from "Core/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { UpdateInterruptedModal } from "Core/overview/components/update-os-modals/update-interrupted-modal"
import { UpdateOsInterruptedFlowTestIds } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow-test-ids"
import { UpdateOsInterruptedFlowProps } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow.interface"

export const UpdateOsInterruptedFlow: FunctionComponent<
  UpdateOsInterruptedFlowProps
> = ({
  onClose,
  deactivateDevice,
  alreadyDownloadedReleases,
  alreadyInstalledReleases,
  downloadInterruptedModalOpened,
  updateInterruptedModalOpened,
}) => {
  const history = useHistory()

  useEffect(() => {
    if (!downloadInterruptedModalOpened && !updateInterruptedModalOpened) {
      return
    }

    history.push(URL_ONBOARDING.welcome)
  }, [history, downloadInterruptedModalOpened, updateInterruptedModalOpened])

  const handleClose = async () => {
    await deactivateDevice()
    onClose()
  }

  return (
    <>
      <DownloadingUpdateInterruptedModal
        testId={UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal}
        open={downloadInterruptedModalOpened}
        onClose={handleClose}
        alreadyDownloadedReleases={alreadyDownloadedReleases}
      />
      <UpdateInterruptedModal
        testId={UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal}
        open={updateInterruptedModalOpened}
        onClose={handleClose}
        alreadyInstalledReleases={alreadyInstalledReleases}
      />
    </>
  )
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { UpdateInterruptedModal } from "App/overview/components/update-os-modals/update-interrupted-modal"
import { UpdateOsInterruptedFlowTestIds } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow-test-ids"
import { UpdateOsInterruptedFlowProps } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow.interface"
import React, { FunctionComponent } from "react"

export const UpdateOsInterruptedFlow: FunctionComponent<UpdateOsInterruptedFlowProps> =
  ({
    onClose,
    alreadyDownloadedReleases,
    alreadyInstalledReleases,
    downloadInterruptedModalOpened,
    updateInterruptedModalOpened,
  }) => {
    return (
      <>
        <DownloadingUpdateInterruptedModal
          testId={UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal}
          open={downloadInterruptedModalOpened}
          onClose={onClose}
          alreadyDownloadedReleases={alreadyDownloadedReleases}
        />
        <UpdateInterruptedModal
          testId={UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal}
          open={updateInterruptedModalOpened}
          onClose={onClose}
          alreadyInstalledReleases={alreadyInstalledReleases}
        />
      </>
    )
  }

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadingUpdateInterruptedModal } from "App/overview/components/update-os-modals/downloading-update-interrupted-modal"
import { UpdatingFailureWithHelpModal } from "App/overview/components/update-os-modals/updating-failure-with-help-modal"
import { UpdateOsInterruptedFlowTestIds } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow-test-ids"
import { UpdateOsInterruptedFlowProps } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow.interface"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { ipcRenderer } from "electron-better-ipc"
import React, { FunctionComponent } from "react"

export const UpdateOsInterruptedFlow: FunctionComponent<UpdateOsInterruptedFlowProps> =
  ({
    onModalClose,
    alreadyDownloadedReleases,
    openContactSupportFlow,
    isDownloadInterruptedModalOpen,
    isUpdateInterruptedModalOpen,
  }) => {
    const openHelpView = (): void => {
      void ipcRenderer.callMain(HelpActions.OpenWindow)
    }

    return (
      <>
        <DownloadingUpdateInterruptedModal
          testId={UpdateOsInterruptedFlowTestIds.DownloadingInterruptedModal}
          open={isDownloadInterruptedModalOpen}
          onClose={onModalClose}
          alreadyDownloadedReleases={alreadyDownloadedReleases}
        />
        <UpdatingFailureWithHelpModal
          testId={UpdateOsInterruptedFlowTestIds.UpdatingInterruptedModal}
          open={isUpdateInterruptedModalOpen}
          onClose={onModalClose}
          onHelp={openHelpView}
          onContact={openContactSupportFlow}
        />
      </>
    )
  }

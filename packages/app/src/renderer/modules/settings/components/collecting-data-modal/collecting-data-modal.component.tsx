/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "Common/enums/about-actions.enum"
import CollectingDataModalUi from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-ui.component"

interface Props
  extends Pick<
    ComponentProps<typeof CollectingDataModalUi>,
    "closeModal" | "open"
  > {
  toggleAppCollectingData: (flag: boolean) => void
}

const CollectingDataModal: FunctionComponent<Props> = ({
  open,
  toggleAppCollectingData,
  closeModal,
}) => {
  const openPrivacyPolicy = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

  const allowToAppCollectingData = (): void => {
    toggleAppCollectingData(true)
    closeModal()
  }

  const disallowToAppCollectingData = (): void => {
    toggleAppCollectingData(false)
    closeModal()
  }

  return (
    <CollectingDataModalUi
      open={open}
      onActionButtonClick={allowToAppCollectingData}
      closeModal={disallowToAppCollectingData}
      onFullAgreementButtonClick={openPrivacyPolicy}
    />
  )
}

export default CollectingDataModal

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"
import { CollectingDataModalUi } from "App/settings/components/collecting-data-modal/collecting-data-modal-ui.component"

interface Props
  extends Pick<
    ComponentProps<typeof CollectingDataModalUi>,
    "closeModal" | "open"
  > {
  toggleCollectionData: (flag: boolean) => void
}

export const CollectingDataModal: FunctionComponent<Props> = ({
  open,
  toggleCollectionData,
  closeModal,
}) => {
  const openPrivacyPolicy = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

  const allowToAppCollectingData = (): void => {
    toggleCollectionData(true)
    closeModal()
  }

  const disallowToAppCollectingData = (): void => {
    toggleCollectionData(false)
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "Common/enums/about-actions.enum"
import CollectingDataModalUi from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-ui.component"

interface Props {
  collectingDataModalShow: boolean
  toggleAppCollectingData: (flag: boolean) => void
  hideCollectingDataModal: () => void
}

//TODO: add component test
const CollectingDataModal: FunctionComponent<Props> = ({
  toggleAppCollectingData,
  collectingDataModalShow,
  hideCollectingDataModal,
}) => {
  const openPrivacyPolicy = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

  const allowToAppCollectingData = (): void => {
    toggleAppCollectingData(true)
    hideCollectingDataModal()
  }

  const disallowToAppCollectingData = (): void => {
    toggleAppCollectingData(false)
    hideCollectingDataModal()
  }

  return (
    <CollectingDataModalUi
      open={collectingDataModalShow}
      onActionButtonClick={allowToAppCollectingData}
      onFullAgreementButtonClick={openPrivacyPolicy}
      closeModal={disallowToAppCollectingData}
    />
  )
}

export default CollectingDataModal

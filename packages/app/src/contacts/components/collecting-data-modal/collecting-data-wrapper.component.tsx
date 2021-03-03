/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import modalService, {
  ModalService,
} from "Renderer/components/core/modal/modal.service"
import CollectingDataModal from "App/contacts/components/collecting-data-modal/collecting-data-modal.component"
import { AppSettings } from "App/main/store/settings.interface"

interface Props {
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
  appCollectingData: boolean | undefined
  openModal?: ModalService["openModal"]
  closeModal?: ModalService["closeModal"]
}

const CollectingDataWrapper: FunctionComponent<Props> = ({
  setCollectingData,
  appCollectingData,
  openModal = modalService.openModal.bind(modalService),
  closeModal = modalService.closeModal.bind(modalService),
}) => {
  const close = () => {
    closeModal()
    setCollectingData(false)
  }
  const agree = () => {
    closeModal()
    setCollectingData(true)
  }

  if (appCollectingData === undefined) {
    openModal(<CollectingDataModal onAgree={agree} onClose={close} />)
  }
  return null
}

export default CollectingDataWrapper

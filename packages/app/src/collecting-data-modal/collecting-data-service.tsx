/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import modalService from "Renderer/components/core/modal/modal.service"
import CollectingDataModal from "App/collecting-data-modal/collecting-data-modal.component"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import store from "Renderer/store"
import { AppSettings } from "App/main/store/settings.interface"

export const handleModalFlow = (
  appCollectingData?: AppSettings["appCollectingData"],
  setCollectingData?: (options: AppSettings["appCollectingData"]) => void
) => {
  if (appCollectingData === undefined && setCollectingData) {
    const close = async () => {
      setCollectingData(false)
    }
    const agree = async () => {
      setCollectingData(true)
      await modalService.closeModal()
    }

    modalService.openModal(
      <CollectingDataModal onActionButtonClick={agree} onClose={close} />
    )
  }
}

const requestDataCollecting = async () => {
  const { appCollectingData } = await getAppSettings()
  const setCollectingData = store.dispatch.settings.setCollectingData

  handleModalFlow(appCollectingData, setCollectingData)
}

export default requestDataCollecting

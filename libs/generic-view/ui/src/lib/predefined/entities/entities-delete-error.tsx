/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { APIFC, IconType } from "generic-view/utils"
import { ButtonAction, EntitiesDeleteErrorConfig } from "generic-view/models"
import { Modal } from "../../interactive/modal/modal"
import { defineMessages } from "react-intl"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { useSelector } from "react-redux"
import {
  selectActiveApiDeviceId,
  selectEntitiesFailedIds,
} from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

const messages = defineMessages({
  allModalTitle: {
    id: "module.genericViews.entities.delete.failure.all.modalTitle",
  },
  someModalTitle: {
    id: "module.genericViews.entities.delete.failure.some.modalTitle",
  },
})

export const EntitiesDeleteError: APIFC<
  undefined,
  EntitiesDeleteErrorConfig
> = ({ config, data }) => {
  const deviceId = useSelector(selectActiveApiDeviceId)!

  const failedIds = useSelector((state: ReduxRootState) => {
    return selectEntitiesFailedIds(state, {
      deviceId,
      entitiesType: config.entitiesType,
    })
  })

  console.log("FailedIds:", failedIds)

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
  ]

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Failure }} />
      <Modal.Title>To jest testowy tytuł błędu</Modal.Title>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary config={{ text: "Close", actions: closeActions }} />
      </Modal.Buttons>
    </>
  )
}

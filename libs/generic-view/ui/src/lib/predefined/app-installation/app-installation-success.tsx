/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { APIFC, IconType } from "generic-view/utils"
import { AppInstallationSuccessConfig, ButtonAction } from "generic-view/models"
import {
  selectInstallationError,
  clearAppInstallationData,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { Typography } from "../../typography"

const messages = defineMessages({
  title: {
    id: "module.genericViews.appInstallation.success.modalTitle",
  },
  closeButtonLabel: {
    id: "module.genericViews.appInstallation.success.closeButton",
  },
  description: {
    id: "module.genericViews.appInstallation.success.description",
  },
})

export const AppInstallationSuccess: APIFC<
  undefined,
  AppInstallationSuccessConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()

  const error = useSelector((state: ReduxRootState) => {
    return selectInstallationError(state)
  })

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        dispatch(clearAppInstallationData())
      },
    },
  ]

  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Confirm,
        }}
      />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <Typography.P1>{intl.formatMessage(messages.description)}</Typography.P1>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            actions: closeActions,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

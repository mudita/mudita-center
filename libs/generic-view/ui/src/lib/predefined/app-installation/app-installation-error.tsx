/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { APIFC, IconType } from "generic-view/utils"
import { AppInstallationErrorConfig, ButtonAction } from "generic-view/models"
import {
  selectInstallationError,
  clearAppInstallationData,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"

const messages = defineMessages({
  title: {
    id: "module.genericViews.appInstallation.error.modalTitle",
  },
  closeButtonLabel: {
    id: "module.genericViews.appInstallation.error.closeButton",
  },
  errorGlobalMessage: {
    id: "module.genericViews.appInstallation.error.globalMessage",
  },
  errorVersionMessage: {
    id: "module.genericViews.appInstallation.error.versionMessage",
  },
})

export const AppInstallationError: APIFC<
  undefined,
  AppInstallationErrorConfig
> = ({ config, data }) => {
  const dispatch = useDispatch<Dispatch>()

  const error = useSelector(selectInstallationError)

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

  const errorMessage = useMemo(() => {
    if (error?.type === 401) {
      return intl.formatMessage(messages.errorVersionMessage)
    }

    return intl.formatMessage(messages.errorGlobalMessage)
  }, [error])

  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Failure,
        }}
      />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{errorMessage}</p>
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

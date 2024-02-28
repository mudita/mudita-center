/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.failure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.backup.failure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.backup.failure.closeButtonLabel",
  },
})

export const BackupFailure: FunctionComponent<{ modalKey: string }> = ({
  modalKey,
}) => {
  // TODO: read error message from the store
  const message = ""
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <p>{message || intl.formatMessage(messages.defaultErrorMessage)}</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            action: {
              type: "close-modal",
              modalKey,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}

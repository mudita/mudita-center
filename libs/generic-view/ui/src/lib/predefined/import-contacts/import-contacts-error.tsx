/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.failure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.importContacts.failure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.importContacts.failure.closeButtonLabel",
  },
})

export interface CustomError {
  title?: string
  message?: string
}

interface Props {
  closeAction: ButtonAction
  customError?: CustomError
}

export const ImportContactsError: FunctionComponent<Props> = ({
  closeAction,
  customError,
}) => {
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>{customError?.title || intl.formatMessage(messages.title)}</h1>
      <p>
        {customError?.message ||
          intl.formatMessage(messages.defaultErrorMessage)}
      </p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            action: closeAction,
          }}
        />
      </ModalButtons>
    </>
  )
}

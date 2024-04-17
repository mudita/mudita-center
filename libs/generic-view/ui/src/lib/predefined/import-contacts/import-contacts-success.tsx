/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import { Modal } from "../../interactive/modal"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { useFormContext } from "react-hook-form"
import { SELECTED_CONTACTS_FIELD } from "./import-contacts-list"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.success.title",
  },
  description: {
    id: "module.genericViews.importContacts.success.description",
  },
  closeButtonLabel: {
    id: "module.genericViews.importContacts.success.closeButtonLabel",
  },
})

interface Props {
  closeAction: ButtonAction
}

export const ImportContactsSuccess: FunctionComponent<Props> = ({
  closeAction,
}) => {
  const { getValues } = useFormContext()
  return (
    <>
      <Modal.TitleIcon data={{ type: IconType.Success }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>
        {intl.formatMessage(messages.description, {
          count: getValues(SELECTED_CONTACTS_FIELD).length,
        })}
      </p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            action: closeAction,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

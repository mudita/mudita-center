/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { ButtonAction, IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"

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

interface Props {
  closeAction: ButtonAction
}

export const BackupRestoreError: FunctionComponent<Props> = ({ closeAction }) => {
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>Restore failed</h1>
      <p>The process was interrupted.</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: "Close",
            action: closeAction,
          }}
        />
      </ModalButtons>
    </>
  )
}

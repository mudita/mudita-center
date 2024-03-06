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
import { useSelector } from "react-redux"
import { selectBackupLocation } from "generic-view/store"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.directoryOpenFailure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.backup.directoryOpenFailure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.backup.directoryOpenFailure.closeButtonLabel",
  },
})

interface Props {
  closeAction: ButtonAction
}

export const BackupDirectoryFailure: FunctionComponent<Props> = ({
  closeAction,
}) => {
  const backupLocation = useSelector(selectBackupLocation)
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Failure,
        }}
      />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <p>{intl.formatMessage(messages.defaultErrorMessage)}</p>
      <p>{backupLocation}</p>
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

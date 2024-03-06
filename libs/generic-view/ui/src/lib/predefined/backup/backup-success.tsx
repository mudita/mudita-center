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
import { openBackupDirectoryRequest } from "device/feature"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.success.title",
  },
  description: {
    id: "module.genericViews.backup.success.description",
  },
  description2: {
    id: "module.genericViews.backup.success.description2",
  },
  openBackupButtonLabel: {
    id: "module.genericViews.backup.success.openBackupButtonLabel",
  },
})

export interface Feature {
  label: string
  key: string
}

interface Props {
  onClose: VoidFunction
  onOpenDirectoryFailure: VoidFunction
}

export const BackupSuccess: FunctionComponent<Props> = ({
  onClose,
  onOpenDirectoryFailure,
}) => {
  const openBackupCallback = async () => {
    const openDirectoryResponse = await openBackupDirectoryRequest()
    if (openDirectoryResponse.ok) {
      onClose()
    } else {
      onOpenDirectoryFailure()
    }
  }
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Success,
        }}
      />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <p>{intl.formatMessage(messages.description)}</p>
      <p>{intl.formatMessage(messages.description2)}</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.openBackupButtonLabel),
            action: {
              type: "custom",
              callback: openBackupCallback,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}

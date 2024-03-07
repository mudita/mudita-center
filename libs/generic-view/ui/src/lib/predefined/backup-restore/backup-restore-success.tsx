/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { ModalButtons, ModalTitleIcon } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.backup.success.title",
  },
  description: {
    id: "module.genericViews.backup.success.description",
  },
  openBackupButtonLabel: {
    id: "module.genericViews.backup.success.openBackupButtonLabel",
  },
  closeButtonLabel: {
    id: "module.genericViews.backup.success.closeButtonLabel",
  },
})

export interface Feature {
  label: string
  key: string
}

interface Props {
  onClose: VoidFunction
}

export const BackupRestoreSuccess: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <>
      <ModalTitleIcon
        data={{
          type: IconType.Success,
        }}
      />
      <h1>Restore complete</h1>
      <p>If your phone needs to restart it will happen automatically.</p>
      <ModalButtons $vertical>
        <ButtonSecondary
          config={{
            text: "OK",
            action: {
              type: "custom",
              callback: onClose,
            },
          }}
        />
      </ModalButtons>
    </>
  )
}

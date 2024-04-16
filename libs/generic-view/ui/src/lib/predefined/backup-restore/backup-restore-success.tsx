/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { IconType } from "generic-view/utils"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.success.title",
  },
  description: {
    id: "module.genericViews.restore.success.description",
  },
  okButtonLabel: {
    id: "module.genericViews.restore.success.okButtonLabel",
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
      <Modal.TitleIcon
        data={{
          type: IconType.Success,
        }}
      />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.okButtonLabel),
            action: {
              type: "custom",
              callback: onClose,
            },
          }}
        />
      </Modal.Buttons>
    </>
  )
}

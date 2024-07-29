/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Modal } from "../../../interactive/modal/modal"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.success.title",
  },
  description: {
    id: "module.genericViews.dataMigration.success.description",
  },
  buttonLabel: {
    id: "module.genericViews.dataMigration.success.buttonLabel",
  },
})

interface Props {
  onButtonClick?: VoidFunction
}

export const SuccessModal: FunctionComponent<Props> = ({ onButtonClick }) => {
  const buttonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      onButtonClick?.()
    },
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Success }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.buttonLabel),
            action: buttonAction,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

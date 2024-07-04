/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Modal } from "../../../interactive/modal/modal"
import { ButtonAction, IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import { modalTransitionDuration } from "generic-view/theme"

interface Props {
  modalIcon: IconType
  title: string
  description: string
  buttonLabel: string
  onButtonClick?: VoidFunction
}

export const ErrorModal: FunctionComponent<Props> = ({
  modalIcon,
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => {
  const buttonAction: ButtonAction = {
    type: "custom",
    callback: () => {
      setTimeout(() => {
        onButtonClick?.()
      }, modalTransitionDuration)
    },
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: modalIcon }} />
      <Modal.Title>{title}</Modal.Title>
      <p>{description}</p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: buttonLabel,
            action: buttonAction,
          }}
        />
      </Modal.Buttons>
    </>
  )
}

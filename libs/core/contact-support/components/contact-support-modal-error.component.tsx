/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { Modal } from "generic-view/ui"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ButtonSecondary } from "../../../generic-view/ui/src/lib/buttons/button-secondary"
import { IconType } from "generic-view/utils"

const messages = defineMessages({
  title: { id: "component.supportModalErrorTitle" },
  body: { id: "component.supportModalErrorBody" },
  closeButtonLabel: { id: "component.supportModalSuccessButtonLabel" },
})

interface Props {
  closeContactSupportFlow: VoidFunction
}

export const ContactSupportModalError: FunctionComponent<Props> = ({
  closeContactSupportFlow,
}) => (
  <>
    <Modal.TitleIcon config={{ type: IconType.Failure }} />
    <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
    <p>{intl.formatMessage(messages.body)}</p>
    <Modal.Buttons config={{ vertical: true }}>
      <ButtonSecondary
        config={{
          text: intl.formatMessage(messages.closeButtonLabel),
          action: {
            type: "custom",
            callback: closeContactSupportFlow,
          },
        }}
      />
    </Modal.Buttons>
  </>
)

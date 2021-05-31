/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { intl } from "Renderer/utils/intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CollectingDataModalTestIds } from "Renderer/wrappers/collecting-data-modal/collecting-data-modal-test-ids.enum"
import {
  ModalContent,
  Paragraph,
} from "Renderer/wrappers/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  title: { id: "component.collectingDataModalTitle" },
  text: { id: "component.collectingDataModalText" },
  body: { id: "component.collectingDataModalBody" },
  cancelButton: { id: "component.collectingDataModalCancel" },
  agreeButton: { id: "component.collectingDataModalAgree" },
})

type Properties = Required<
  Pick<
    ComponentProps<typeof ModalDialog>,
    "onActionButtonClick" | "closeModal" | "open"
  >
>

const CollectingDataModal: FunctionComponent<Properties> = (props) => {
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      actionButtonLabel={intl.formatMessage(messages.agreeButton)}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      {...props}
    >
      <ModalContent>
        <Icon type={Type.MuditaLogoBg} width={12} height={12} />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Subtitle}
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.text}
        />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Body}
          displayStyle={TextDisplayStyle.MediumText}
          message={messages.body}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default CollectingDataModal

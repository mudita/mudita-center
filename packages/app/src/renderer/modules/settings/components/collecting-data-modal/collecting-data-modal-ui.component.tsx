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
import { CollectingDataModalTestIds } from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import {
  FullAgreementButton,
  ModalContent,
  Paragraph,
} from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Size } from "Renderer/components/core/button/button.config"

const messages = defineMessages({
  title: { id: "component.collectingDataModalTitle" },
  text: { id: "component.collectingDataModalText" },
  body: { id: "component.collectingDataModalBody" },
  cancelButton: { id: "component.collectingDataModalCancel" },
  agreeButton: { id: "component.collectingDataModalAgree" },
})

interface Props
  extends Required<
    Pick<
      ComponentProps<typeof ModalDialog>,
      "onActionButtonClick" | "closeModal" | "open"
    >
  > {
  onFullAgreementButtonClick: () => void
}

const CollectingDataModalUi: FunctionComponent<Props> = ({
  onFullAgreementButtonClick,
  ...props
}) => {
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      actionButtonLabel={intl.formatMessage(messages.agreeButton)}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
      actionButtonSize={Size.FixedMedium}
      testId={CollectingDataModalTestIds.Container}
      {...props}
    >
      <ModalContent>
        <Icon type={Type.MuditaLogoBg} width={12} height={12} />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Subtitle}
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.text}
        />
        <Paragraph
          data-testid={CollectingDataModalTestIds.Body}
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.body}
        />
        <FullAgreementButton
          displayStyle={DisplayStyle.Link3}
          labelMessage={{
            id: "component.collectingDataModalFullAgreement",
          }}
          onClick={onFullAgreementButtonClick}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default CollectingDataModalUi

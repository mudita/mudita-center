/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { CollectingDataModalTestIds } from "App/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import {
  FullAgreementButton,
  ModalContent,
  Paragraph,
} from "App/settings/components/collecting-data-modal/collecting-data-modal.styled"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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

export const CollectingDataModalUi: FunctionComponent<Props> = ({
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
        <Icon type={IconType.MuditaLogoBg} width={12} height={12} />
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
          displayStyle={DisplayStyle.ActionLink}
          labelMessage={{
            id: "component.collectingDataModalFullAgreement",
          }}
          onClick={onFullAgreementButtonClick}
        />
      </ModalContent>
    </ModalDialog>
  )
}

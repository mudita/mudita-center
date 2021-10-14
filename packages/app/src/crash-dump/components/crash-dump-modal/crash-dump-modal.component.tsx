/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  IconWrapper,
  ContentWrapper,
} from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.styled"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"

export interface CrashDumpProps {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

const messages = defineMessages({
  title: { id: "component.crashDumpModal.title" },
  label: { id: "component.crashDumpModal.label" },
  text: { id: "component.crashDumpModal.text" },
})

export const CrashDumpModal: FunctionComponent<CrashDumpProps> = ({
  open,
  onClose,
  onAccept,
}) => {
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      open={open}
      closeModal={onClose}
      closeButtonLabel="Cancel"
      onActionButtonClick={onAccept}
      actionButtonLabel="Accept"
    >
      <ContentWrapper data-testid={CrashDumpModalTestingIds.Content}>
        <IconWrapper>
          <Icon type={Type.ThinFail} width={3.2} height={3.2} />
        </IconWrapper>
        <Text
          data-testid={CrashDumpModalTestingIds.Label}
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.label}
        />
        <Text
          data-testid={CrashDumpModalTestingIds.Text}
          displayStyle={TextDisplayStyle.MediumFadedLightText}
          message={messages.text}
        />
      </ContentWrapper>
    </ModalDialog>
  )
}

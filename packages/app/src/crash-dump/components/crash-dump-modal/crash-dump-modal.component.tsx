/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeviceType } from "@mudita/pure"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  IconWrapper,
  ContentWrapper,
} from "App/crash-dump/components/crash-dump-modal/crash-dump-modal.styled"
import { CrashDumpModalTestingIds } from "App/crash-dump/components/crash-dump-modal/crash-dump-modal-testing-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export interface CrashDumpProps {
  open: boolean
  deviceType: DeviceType
  onClose: () => void
  onAccept: () => void
}

const messages = defineMessages({
  title: { id: "component.crashDumpModal.title" },
  pureLabel: { id: "component.crashDumpModal.pureLabel" },
  harmonyLabel: { id: "component.crashDumpModal.harmonyLabel" },
  text: { id: "component.crashDumpModal.text" },
  accept: { id: "component.crashDumpModal.accept" },
  close: { id: "component.crashDumpModal.close" },
})

export const CrashDumpModal: FunctionComponent<CrashDumpProps> = ({
  open,
  deviceType,
  onClose,
  onAccept,
}) => {
  return (
    <ModalDialog
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      open={open}
      closeModal={onClose}
      closeButtonLabel={intl.formatMessage(messages.close)}
      onActionButtonClick={onAccept}
      actionButtonLabel={intl.formatMessage(messages.accept)}
      actionButtonSize={Size.FixedSmall}
    >
      <ContentWrapper data-testid={CrashDumpModalTestingIds.Content}>
        <IconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} height={3.2} />
        </IconWrapper>
        {deviceType === DeviceType.MuditaPure ? (
          <Text
            data-testid={CrashDumpModalTestingIds.Label}
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.pureLabel}
          />
        ) : (
          <Text
            data-testid={CrashDumpModalTestingIds.Label}
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.harmonyLabel}
          />
        )}
        <Text
          data-testid={CrashDumpModalTestingIds.Text}
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.text}
        />
      </ContentWrapper>
    </ModalDialog>
  )
}

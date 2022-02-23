/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { ModalContent } from "Renderer/components/core/modal-dialog/modal-dialog-shared"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { LoaderWrapper } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-modal.styled"
import { CrashDumpSendingModalTestingIds } from "App/crash-dump/components/crash-dump-sending-modal/crash-dump-sending-testing-ids.enum"

export interface CrashDumpSendingModalProps {
  open: boolean
}

const messages = defineMessages({
  label: { id: "component.crashDumpSendingModal.label" },
})

export const CrashDumpSendingModal: FunctionComponent<
  CrashDumpSendingModalProps
> = ({ open }) => {
  return (
    <ModalDialog
      open={open}
      size={ModalSize.Small}
      closeable={false}
      closeButton={false}
    >
      <ModalContent data-testid={CrashDumpSendingModalTestingIds.Content}>
        <LoaderWrapper>
          <Loader size={2} type={LoaderType.Spinner} />
        </LoaderWrapper>

        <Text
          data-testid={CrashDumpSendingModalTestingIds.Label}
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.label}
        />
      </ModalContent>
    </ModalDialog>
  )
}

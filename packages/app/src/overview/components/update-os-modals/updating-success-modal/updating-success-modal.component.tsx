/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { UpdatingSuccessModalProps } from "App/overview/components/update-os-modals/updating-success-modal/updating-success-modal.interface"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  updatingSuccessTitle: {
    id: "module.overview.updatingSuccessTitle",
  },
  updatingSuccessDescription: {
    id: "module.overview.updatingSuccessDescription",
  },
})

export const UpdatingSuccessModal: FunctionComponent<
  UpdatingSuccessModalProps
> = ({ open, onClose, testId }) => (
  <OSUpdateModal
    testId={testId}
    open={open}
    closeable
    closeButton
    onClose={onClose}
    closeModal={onClose}
  >
    <RoundIconWrapper>
      <Icon type={IconType.Pure} width={3.2} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updatingSuccessTitle}
    />
    <ModalText
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={messages.updatingSuccessDescription}
    />
  </OSUpdateModal>
)

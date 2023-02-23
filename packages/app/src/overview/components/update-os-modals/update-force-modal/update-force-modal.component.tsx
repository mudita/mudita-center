/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { UpdatingForceModalProps } from "App/overview/components/update-os-modals/update-force-modal/update-force-modal.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  updatingForceActionButton: {
    id: "module.overview.updatingForceActionButton",
  },
  updatingForceTitle: {
    id: "module.overview.updatingForceTitle",
  },
  updatingForceDescription: {
    id: "module.overview.updatingForceDescription",
  },
})
export const UpdatingForceModal: FunctionComponent<UpdatingForceModalProps> = ({
  open,
  testId,
  onActionButtonClick,
}) => {
  return (
    <OSUpdateModal
      testId={testId}
      open={open}
      closeButton={false}
      closeable={false}
      actionButtonLabel={intl.formatMessage(messages.updatingForceActionButton)}
      onActionButtonClick={onActionButtonClick}
    >
      <RoundIconWrapper>
        <Icon type={IconType.Pure} width={3.2} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.updatingForceTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.updatingForceDescription}
      />
    </OSUpdateModal>
  )
}

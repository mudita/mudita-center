/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModal } from "App/overview/components/modals/os-update-modal"
import { UpdateNotAvailableModalProps } from "App/overview/components/modals/update-not-available-modal/update-not-available-modal.interface"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  updateAvailableButton: {
    id: "module.overview.updateAvailableButton",
  },
  updateNotAvailableMessage: {
    id: "module.overview.updateNotAvailableMessage",
  },
  updateNotAvailableDescription: {
    id: "module.overview.updateNotAvailableDescription",
  },
})

export const UpdateNotAvailableModal: FunctionComponent<
  UpdateNotAvailableModalProps
> = ({ version, open, onClose }) => (
  <OSUpdateModal
    open={open}
    closeable
    closeButton
    closeModal={onClose}
    onClose={onClose}
    actionButtonLabel={intl.formatMessage(messages.updateAvailableButton)}
  >
    <RoundIconWrapper>
      <Icon type={IconType.Pure} width={3.2} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updateNotAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={{
        ...messages.updateNotAvailableDescription,
        values: {
          version,
        },
      }}
    />
  </OSUpdateModal>
)

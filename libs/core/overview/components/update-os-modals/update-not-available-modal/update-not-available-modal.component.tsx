/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModal } from "Core/overview/components/update-os-modals/os-update-modal"
import { UpdateNotAvailableModalProps } from "Core/overview/components/update-os-modals/update-not-available-modal/update-not-available-modal.interface"
import {
  ModalMainText,
  RoundIconWrapper,
} from "Core/ui/components/modal-dialog"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
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
> = ({ version, open, onClose, testId, ...rest }) => (
  <OSUpdateModal
    open={open}
    testId={testId}
    closeable
    closeButton
    closeModal={onClose}
    onClose={onClose}
    actionButtonLabel={intl.formatMessage(messages.updateAvailableButton)}
    {...rest}
  >
    <RoundIconWrapper>
      <Icon type={IconType.Info} width={4.8} />
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

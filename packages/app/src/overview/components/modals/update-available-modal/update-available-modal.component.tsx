/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModal } from "App/overview/components/modals/os-update-modal"
import { UpdateAvailableModalProps } from "App/overview/components/modals/update-available-modal/update-available-modal.interface"
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
  updateAvailableMessage: {
    id: "module.overview.updateAvailableMessage",
  },
  updateAvailableDescription: {
    id: "module.overview.updateAvailableDescription",
  },
  updateAvailableButton: {
    id: "module.overview.updateAvailableButton",
  },
})

export const UpdateAvailableModal: FunctionComponent<
  UpdateAvailableModalProps
> = ({ onDownload, version, date, open, onClose }) => (
  <OSUpdateModal
    open={open}
    closeButton={false}
    closeable
    actionButtonLabel={intl.formatMessage(messages.updateAvailableButton)}
    onActionButtonClick={onDownload}
    closeModal={onClose}
  >
    <RoundIconWrapper>
      <Icon type={IconType.Pure} width={3.2} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updateAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={{
        ...messages.updateAvailableDescription,
        values: {
          version,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
      }}
    />
  </OSUpdateModal>
)

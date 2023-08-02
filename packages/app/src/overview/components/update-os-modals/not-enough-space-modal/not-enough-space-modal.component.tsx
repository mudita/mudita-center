/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { NotEnoughSpaceModalProps } from "./not-enough-space-modal.interface"

const DescriptionText = styled(ModalText)`
  margin-top: 0.4rem;
`

const messages = defineMessages({
  updatingUnsuccessTitle: {
    id: "module.overview.updatingUnsuccessTitle",
  },
  updatingNotEnoughSpaceDescription: {
    id: "module.overview.updatingNotEnoughSpaceDescription",
  },
  updatingNotEnoughSpaceActionButton: {
    id: "component.okButton",
  },
})

export const NotEnoughSpaceModal: FunctionComponent<
  NotEnoughSpaceModalProps
> = ({ onClose, open, testId, fileSize, ...rest }) => {
  return (
    <OSUpdateModal
      testId={testId}
      open={open}
      closeButton
      closeable
      closeModal={onClose}
      closeButtonLabel={intl.formatMessage(
        messages.updatingNotEnoughSpaceActionButton
      )}
      {...rest}
    >
      <RoundIconWrapper>
        <Icon type={IconType.ThinFail} width={3.2} />
      </RoundIconWrapper>
      <ModalText displayStyle={TextDisplayStyle.Headline4}>
        {intl.formatMessage(messages.updatingUnsuccessTitle)}
      </ModalText>
      <DescriptionText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
      >
        {intl.formatMessage(messages.updatingNotEnoughSpaceDescription, {
          value: Math.ceil(fileSize / 1000000),
        })}
      </DescriptionText>
    </OSUpdateModal>
  )
}

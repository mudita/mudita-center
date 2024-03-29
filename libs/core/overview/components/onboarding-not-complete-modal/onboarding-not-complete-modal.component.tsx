/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "Core/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { OSUpdateModal } from "Core/overview/components/update-os-modals/os-update-modal"
import { RoundIconWrapper } from "Core/ui/components/modal-dialog"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { OnboardingNotCompleteModalProps } from "Core/overview/components/onboarding-not-complete-modal/onboarding-not-complete-modal.interface"

const DescriptionText = styled(ModalText)`
  margin-top: 0.4rem;
`

const messages = defineMessages({
  updatingUnsuccessTitle: {
    id: "module.overview.updatingUnsuccessTitle",
  },

  updatingOnboardingNotCompleteDescription: {
    id: "module.overview.updatingOnboardingNotCompleteDescription",
  },
  updatingOnboardingNotCompleteActionButton: {
    id: "component.okButton",
  },
})

export const OnboardingNotCompleteModal: FunctionComponent<
  OnboardingNotCompleteModalProps
> = ({ onClose, open, testId, ...rest }) => {
  return (
    <OSUpdateModal
      testId={testId}
      open={open}
      closeButton
      closeable
      closeModal={onClose}
      closeButtonLabel={intl.formatMessage(
        messages.updatingOnboardingNotCompleteActionButton
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
        {intl.formatMessage(messages.updatingOnboardingNotCompleteDescription)}
      </DescriptionText>
    </OSUpdateModal>
  )
}

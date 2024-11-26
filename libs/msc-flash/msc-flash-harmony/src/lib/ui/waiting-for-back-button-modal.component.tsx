/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

interface CompletedInfoModalProps {
  open: boolean
  onClose: () => void
}

const messages = defineMessages({
  waitingForBackButtonModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  waitingForBackButtonModalSubtitle: {
    id: "module.recoveryMode.modal.waitingForBackButton.subtitle",
  },
  waitingForBackButtonModalDescription: {
    id: "module.recoveryMode.modal.waitingForBackButton.description",
  },
})

export const WaitingForBackButtonModal: FunctionComponent<
  CompletedInfoModalProps
> = ({ open, onClose }) => {
  return (
    <>
      <ModalDialog
        open={open}
        title={intl.formatMessage(messages.waitingForBackButtonModalTitle)}
        size={ModalSize.Small}
        closeable={true}
        closeButton={false}
        closeModal={onClose}
        onClose={onClose}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.CheckCircleBlack} width={4.8} />
          </RoundIconWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.waitingForBackButtonModalSubtitle}
          />
          <Descrption>
            <Text
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.waitingForBackButtonModalDescription}
            />
          </Descrption>
          <BackArrowIconWrapper>
            <Icon type={IconType.BackArrowIcon} width={4.8} />
          </BackArrowIconWrapper>
        </ModalContent>
      </ModalDialog>
    </>
  )
}

const Descrption = styled.div`
  margin-top: 0.8rem;
`

export const BackArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.4rem;
`

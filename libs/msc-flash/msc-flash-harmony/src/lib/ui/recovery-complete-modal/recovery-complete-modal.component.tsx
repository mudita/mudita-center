/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { selectFlashingProcessState } from "../../selectors"
import { FlashingProcessState } from "../../constants"
import { setFlashingProcessState } from "../../actions"

const messages = defineMessages({
  recoveryCompleteModalTitle: {
    id: "module.recoveryMode.harmony.title",
  },
  recoveryCompleteModalSubtitle: {
    id: "module.recoveryMode.modal.completed.subtitle",
  },
  recoveryCompleteModalDescription: {
    id: "module.recoveryMode.modal.completed.description",
  },
})

export const RecoveryCompleteModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const flashingProcessState = useSelector(selectFlashingProcessState)
  const opened = flashingProcessState === FlashingProcessState.Completed

  const onClose = () => {
    dispatch(setFlashingProcessState(FlashingProcessState.Idle))
  }

  return (
    <>
      <ModalDialog
        open={opened}
        title={intl.formatMessage(messages.recoveryCompleteModalTitle)}
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
            message={messages.recoveryCompleteModalSubtitle}
          />
          <Descrption>
            <Text
              displayStyle={TextDisplayStyle.Paragraph4}
              message={messages.recoveryCompleteModalDescription}
            />
          </Descrption>
          <LightButtonIconWrapper>
            <Icon type={IconType.BackArrowIcon} width={4.8} />
          </LightButtonIconWrapper>
        </ModalContent>
      </ModalDialog>
    </>
  )
}

const Descrption = styled.div`
  margin-top: 0.8rem;
`

export const LightButtonIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.4rem;
`

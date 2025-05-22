/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import { Icon, Modal } from "app-theme/ui"
import { IconSize, IconType, ModalSize } from "app-theme/models"
import styled from "styled-components"
import { TextDisplayStyle } from "app-theme/models"
import { LegacyText } from "app-theme/ui"
import { backgroundColor } from "app-theme/utils"

interface ErrorModalProps {
  opened: boolean
  title: string
  subtitle?: string
  body?: string | ReactNode
  subbody?: string
  onClose: () => void
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

export const RoundIconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: ${backgroundColor("icon")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.2rem;
`

export const ErrorModal: FunctionComponent<ErrorModalProps> = ({
  opened,
  title,
  subtitle,
  body,
  subbody,
  onClose,
}) => {
  return (
    <Modal opened={opened} size={ModalSize.Small} onRequestClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Content>
        <RoundIconWrapper>
          <Icon type={IconType.ThinFail} size={IconSize.Big} />
        </RoundIconWrapper>
        {subtitle && (
          <LegacyText displayStyle={TextDisplayStyle.Headline4}>
            {subtitle}
          </LegacyText>
        )}
        {body && (
          <LegacyText
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
          >
            {body}
          </LegacyText>
        )}
        {subbody && (
          <LegacyText
            displayStyle={TextDisplayStyle.Paragraph3}
            color="secondary"
          >
            {subbody}
          </LegacyText>
        )}
      </Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import { IconSize, IconType, ModalSize } from "app-theme/models"
import styled from "styled-components"
import { Modal } from "../modal"
import { RoundIconWrapper } from "../../icon/icon-ui.styled"
import { Icon } from "../../icon/icon"
import { Typography } from "../../typography/typography"

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
        {subtitle && <Typography.H4>{subtitle}</Typography.H4>}
        {body && <Typography.P4 color="grey1">{body}</Typography.P4>}
        {subbody && <Typography.P3 color="grey1">{subbody}</Typography.P3>}
      </Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Buttons>
    </Modal>
  )
}

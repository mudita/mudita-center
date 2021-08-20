/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal, { ModalProps } from "Renderer/components/core/modal/modal.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import styled from "styled-components"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  p + p {
    margin-top: 1.2rem;
  }
`

interface Props extends ModalProps {
  title: string
  subtitle?: string
  body?: string
}

const InfoModal: FunctionComponent<Props> = ({
  title,
  subtitle,
  body,
  ...rest
}) => (
  <Modal title={title} size={ModalSize.Small} {...rest}>
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.Info} width={5} />
      </RoundIconWrapper>
      {subtitle && (
        <ModalText displayStyle={TextDisplayStyle.LargeBoldText}>
          {subtitle}
        </ModalText>
      )}
      {body && (
        <ModalText displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {body}
        </ModalText>
      )}
    </ModalContent>
  </Modal>
)

export default InfoModal

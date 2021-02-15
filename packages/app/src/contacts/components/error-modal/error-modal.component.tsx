import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ErrorModalProps } from "App/contacts/components/error-modal/error-modal.interface"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import styled from "styled-components"

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

const ErrorModal: FunctionComponent<ErrorModalProps> = ({
  title,
  subtitle,
  body,
  ...rest
}) => (
  <Modal title={title} size={ModalSize.Small} {...rest}>
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.Fail} width={5} />
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

export default ErrorModal

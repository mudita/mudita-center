import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import Button, {
  Props as ButtonProps,
} from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import Text from "Renderer/components/core/text/text.component"
import {
  getButtonsPosition,
  getHeaderTemplate,
  getModalButtonsSize,
  getModalSize,
  getSubtitleStyle,
  getTitleStyle,
} from "Renderer/components/core/modal/modal.helpers"
import { useModalServiceContext } from "Renderer/components/core/modal/modal.service"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.interface"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"

const ModalFrame = styled.div<{ size: ModalSize }>`
  ${({ size }) => getModalSize(size)};
`

const Header = styled.div<{ titleOrder: TitleOrder }>`
  display: grid;
  grid-template-columns: 1fr 5rem;
  grid-row-gap: 1rem;
  ${({ titleOrder }) => getHeaderTemplate(titleOrder)};
`

const ModalTitle = styled(Text)<{ subTitle?: string }>`
  grid-area: Title;
`

const ModalSubTitle = styled(Text)`
  grid-area: Subtitle;
`

const Close = styled(Button)`
  margin-top: -0.5rem;
  grid-area: Close;
  justify-self: end;
`

const ButtonContainer = styled.div<{ buttonsPosition: ModalSize }>`
  display: flex;
  ${({ buttonsPosition }) => getButtonsPosition(buttonsPosition)};
`

const ButtonWrapper = styled.div`
  display: flex;
`

const CloseButton = styled(Button)<{ actionButton?: boolean }>`
  ${({ actionButton }) =>
    actionButton &&
    css`
      margin-right: 1.5rem;
    `};
`

export interface ModalProps {
  actionButtonLabel?: ButtonProps["label"]
  actionButtonIcon?: ButtonProps["Icon"]
  onActionButtonClick?: () => void
  closeable?: boolean
  closeButton?: boolean
  closeButtonLabel?: ButtonProps["label"]
  onClose?: () => void
  size?: ModalSize
  subtitle?: string
  title?: string
  titleOrder?: TitleOrder
}

const Modal: FunctionComponent<ModalProps> = ({
  className,
  actionButtonLabel,
  actionButtonIcon,
  onActionButtonClick,
  children,
  closeable = true,
  closeButton = true,
  closeButtonLabel = intl.formatMessage({ id: "component.modal.closeButton" }),
  onClose = noop,
  size = ModalSize.Large,
  subtitle,
  title,
  titleOrder = TitleOrder.TitleFirst,
}) => {
  const modalService = useModalServiceContext()

  const closeModal = async () => {
    await modalService.allowClosingModal()
    await modalService.closeModal()
    onClose()
  }
  return (
    <ModalFrame size={size} className={className}>
      <Header titleOrder={titleOrder}>
        <ModalTitle
          displayStyle={getTitleStyle(size)}
          subTitle={subtitle}
          element={"h2"}
        >
          {title}
        </ModalTitle>
        {closeable && (
          <Close
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Type.Close}
            data-testid={"close-modal-button"}
          />
        )}
        <ModalSubTitle displayStyle={getSubtitleStyle(size)} element={"p"}>
          {subtitle}
        </ModalSubTitle>
      </Header>
      {children}
      <ButtonContainer buttonsPosition={size}>
        <ButtonWrapper>
          {closeButton && (
            <CloseButton
              actionButton={Boolean(actionButtonLabel)}
              displayStyle={DisplayStyle.Secondary}
              size={getModalButtonsSize(size)}
              label={closeButtonLabel}
              onClick={closeModal}
              data-testid={"modal-action-button"}
            />
          )}
          {actionButtonLabel && onActionButtonClick && (
            <Button
              displayStyle={DisplayStyle.Primary}
              size={getModalButtonsSize(size)}
              label={actionButtonLabel}
              onClick={onActionButtonClick}
              data-testid={"modal-action-button"}
              Icon={actionButtonIcon}
            />
          )}
        </ButtonWrapper>
      </ButtonContainer>
    </ModalFrame>
  )
}

export default Modal

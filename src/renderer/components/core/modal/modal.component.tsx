import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { ReactNode } from "react"

const ModalFrame = styled.div<{ size: ModalSize }>`
  padding: 4rem 3.2rem 4.8rem 3.2rem;
  box-sizing: border-box;
  ${({ size }) => getModalSize(size)};
  background-color: ${backgroundColor("modal")};
`

const Header = styled.div<{ titleOrder: TitleOrder; subtitleGap: boolean }>`
  display: grid;
  grid-template-columns: 1fr 5rem;
  grid-row-gap: ${({ subtitleGap }) => (subtitleGap ? "1rem" : "initial")};
  ${({ titleOrder }) => getHeaderTemplate(titleOrder)};
  box-sizing: border-box;
  padding-bottom: 3.2rem;
`

const ModalTitle = styled(Text)<{ subTitle?: string }>`
  grid-area: Title;
`

const ModalSubTitle = styled(Text)`
  grid-area: Subtitle;
`

const Close = styled(Button)`
  margin-top: -0.6rem;
  margin-right: -0.8rem;
  grid-area: Close;
  justify-self: end;
`

export const ButtonContainer = styled.div<{ buttonsPosition: ModalSize }>`
  ${({ buttonsPosition }) => getButtonsPosition(buttonsPosition)};
  display: flex;
  box-sizing: border-box;
  padding-top: 4.8rem;
`

export const ButtonWrapper = styled.div`
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
  actionButtonDisabled?: boolean
  onActionButtonClick?: () => void
  closeable?: boolean
  closeButton?: boolean
  closeButtonLabel?: ButtonProps["label"]
  onClose?: () => void
  size?: ModalSize
  subtitle?: string
  title?: string | ReactNode
  titleOrder?: TitleOrder
}

const Modal: FunctionComponent<ModalProps> = ({
  actionButtonLabel,
  actionButtonIcon,
  actionButtonDisabled,
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
  ...rest
}) => {
  const modalService = useModalServiceContext()

  const closeModal = async () => {
    await modalService.allowClosingModal()
    await modalService.closeModal()
    onClose()
  }
  return (
    <ModalFrame size={size} {...rest}>
      <Header
        titleOrder={titleOrder}
        subtitleGap={Boolean(subtitle)}
        data-testid={ModalTestIds.Header}
      >
        <ModalTitle
          displayStyle={getTitleStyle(size)}
          subTitle={subtitle}
          element={"h2"}
          data-testid={ModalTestIds.Title}
        >
          {title}
        </ModalTitle>
        {closeable && (
          <Close
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Type.Close}
            data-testid={ModalTestIds.CloseButton}
          />
        )}
        <ModalSubTitle displayStyle={getSubtitleStyle(size)} element={"p"}>
          {subtitle}
        </ModalSubTitle>
      </Header>
      {children}
      {actionButtonLabel || closeButton ? (
        <ButtonContainer buttonsPosition={size}>
          <ButtonWrapper>
            {closeButton && (
              <CloseButton
                actionButton={Boolean(actionButtonLabel)}
                displayStyle={DisplayStyle.Secondary}
                size={getModalButtonsSize(size)}
                label={closeButtonLabel}
                onClick={closeModal}
                data-testid={ModalTestIds.ModalActionButton}
              />
            )}
            {actionButtonLabel && onActionButtonClick && (
              <Button
                displayStyle={DisplayStyle.Primary}
                size={getModalButtonsSize(size)}
                label={actionButtonLabel}
                onClick={onActionButtonClick}
                data-testid={ModalTestIds.ModalActionButton}
                Icon={actionButtonIcon}
                disabled={actionButtonDisabled}
              />
            )}
          </ButtonWrapper>
        </ButtonContainer>
      ) : null}
    </ModalFrame>
  )
}

export default Modal

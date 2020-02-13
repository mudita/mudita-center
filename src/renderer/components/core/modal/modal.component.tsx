import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled, { css } from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { ReactElement } from "react"

export enum ModalSize {
  Small,
  Medium,
  Large,
}

const getModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Small:
      return css`
        width: calc(38rem - 4rem);
      `
    case ModalSize.Medium:
      return css`
        width: calc(59rem - 4rem);
      `
    case ModalSize.Large:
      return css`
        width: calc(101rem - 4rem);
      `
    default:
      return
  }
}
const ModalWrapper = styled.div<{ size: ModalSize }>`
  ${({ size }) => getModalSize(size)}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  heading?: ReactElement
  size?: ModalSize
  renderCloseButton?: boolean
}

const Modal: FunctionComponent<Props> = ({
  children,
  heading,
  size = ModalSize.Large,
  renderCloseButton = true,
}) => {
  const closeModal = async () => {
    modalService.allowClosingModal()
    await modalService.closeModal()
  }
  return (
    <ModalWrapper size={size}>
      <Header>
        {heading}
        {renderCloseButton && (
          <Button
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Close}
          />
        )}
      </Header>
      {children}
    </ModalWrapper>
  )
}

export default Modal

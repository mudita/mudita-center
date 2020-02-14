import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled, { css } from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { ReactElement } from "react"

export enum ModalSize {
  VerySmall,
  Small,
  Medium,
  Large,
}

const getModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return css`
        width: calc(27.5rem - 4rem);
      `
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
const ModalFrame = styled.div<{ size: ModalSize }>`
  box-sizing: border-box;
  ${({ size }) => getModalSize(size)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  title?: ReactElement
  subTitle?: ReactElement
  size?: ModalSize
  closeable?: boolean
}

const Modal: FunctionComponent<Props> = ({
  children,
  closeable = true,
  title,
  subTitle,
  size = ModalSize.Large,
}) => {
  const closeModal = () => {
    modalService.allowClosingModal()
    modalService.closeModal()
  }
  return (
    <ModalFrame size={size}>
      <Header>
        {title}
        {closeable && (
          <Button
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Close}
          />
        )}
      </Header>
      {subTitle}
      {children}
    </ModalFrame>
  )
}

export default Modal

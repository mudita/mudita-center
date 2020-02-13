import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled from "styled-components"
import Button from "Renderer/components/core/button/button.component"

const ModalWrapper = styled.div``

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseButton = styled(Button)``

const Modal: FunctionComponent<{}> = ({ children }) => {
  const closeModal = async () => {
    modalService.allowClosingModal()
    await modalService.closeModal()
  }
  return (
    <ModalWrapper>
      <Header>
        <h1>laal</h1>
        <CloseButton
          displayStyle={DisplayStyle.IconOnly2}
          onClick={closeModal}
          Icon={Close}
        />
      </Header>

      {children}
    </ModalWrapper>
  )
}

export default Modal

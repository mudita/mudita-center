import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import Text from "Renderer/components/core/text/text.component"
import {
  getHeaderTemplate,
  getModalSize,
  getSubTitleStyleBasedOnModalSize,
  getTitleStyleBasedOnModalSize,
} from "Renderer/components/core/modal/modal.helpers"

export enum ModalSize {
  VerySmall,
  Small,
  Medium,
  Large,
}

export enum TitleOrder {
  TitleFirst,
  SubTitleFirst,
}

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

const CloseButton = styled(Button)`
  margin-top: -0.5rem;
  grid-area: CloseButton;
  justify-self: end;
`

interface Props {
  closeable?: boolean
  onClose?: () => void
  size: ModalSize
  subTitle?: string
  title?: string
  titleOrder?: TitleOrder
}

const Modal: FunctionComponent<Props> = ({
  children,
  closeable = true,
  onClose = noop,
  size = ModalSize.Large,
  subTitle,
  title,
  titleOrder = TitleOrder.TitleFirst,
}) => {
  const closeModal = () => {
    modalService.allowClosingModal()
    modalService.closeModal()
    onClose()
  }
  return (
    <ModalFrame size={size}>
      <Header titleOrder={titleOrder}>
        <ModalTitle
          displayStyle={getTitleStyleBasedOnModalSize(size)}
          subTitle={subTitle}
          element={"h2"}
        >
          {title}
        </ModalTitle>
        {closeable && (
          <CloseButton
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Close}
          />
        )}
        <ModalSubTitle
          displayStyle={getSubTitleStyleBasedOnModalSize(size)}
          element={"p"}
        >
          {subTitle}
        </ModalSubTitle>
      </Header>

      {children}
    </ModalFrame>
  )
}

export default Modal

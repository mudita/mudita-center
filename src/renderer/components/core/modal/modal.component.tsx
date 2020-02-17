import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled, { css } from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import Text from "Renderer/components/core/text/text.component"
import {
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled(Text)<{ subTitle?: string }>`
  ${({ subTitle }) =>
    subTitle &&
    css`
      margin-bottom: 1rem;
    `};
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
      <Header>
        {titleOrder === TitleOrder.TitleFirst ? (
          <ModalTitle
            displayStyle={getTitleStyleBasedOnModalSize(size)}
            subTitle={subTitle}
            element={"h2"}
          >
            {title}
          </ModalTitle>
        ) : (
          <Text
            displayStyle={getSubTitleStyleBasedOnModalSize(size)}
            element={"p"}
          >
            {subTitle}
          </Text>
        )}
        {closeable && (
          <Button
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Close}
          />
        )}
      </Header>
      {titleOrder === TitleOrder.TitleFirst ? (
        <Text
          displayStyle={getSubTitleStyleBasedOnModalSize(size)}
          element={"p"}
        >
          {subTitle}
        </Text>
      ) : (
        <ModalTitle
          displayStyle={getTitleStyleBasedOnModalSize(size)}
          subTitle={subTitle}
          element={"h2"}
        >
          {title}
        </ModalTitle>
      )}
      {children}
    </ModalFrame>
  )
}

export default Modal

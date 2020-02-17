import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Close from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled, { css } from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

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

const getTitleStyleBasedOnModalSize = (size: ModalSize): TextDisplayStyle => {
  switch (size) {
    case ModalSize.VerySmall:
      return TextDisplayStyle.LargeBoldText
    case ModalSize.Small || ModalSize.Medium:
      return TextDisplayStyle.SecondaryBoldHeading
    case ModalSize.Large:
      return TextDisplayStyle.TertiaryBoldHeading
    default:
      return TextDisplayStyle.TertiaryBoldHeading
  }
}

const getSubTitleStyleBasedOnModalSize = (
  size: ModalSize
): TextDisplayStyle => {
  switch (size) {
    case ModalSize.Small:
      return TextDisplayStyle.SmallFadedText
    case ModalSize.Large:
      return TextDisplayStyle.MediumText
    default:
      return TextDisplayStyle.MediumText
  }
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
}

const Modal: FunctionComponent<Props> = ({
  children,
  closeable = true,
  onClose = noop,
  size = ModalSize.Large,
  subTitle,
  title,
}) => {
  const closeModal = () => {
    modalService.allowClosingModal()
    modalService.closeModal()
    onClose()
  }
  return (
    <ModalFrame size={size}>
      <Header>
        <ModalTitle
          displayStyle={getTitleStyleBasedOnModalSize(size)}
          subTitle={subTitle}
          element={"h2"}
        >
          {title}
        </ModalTitle>
        {closeable && (
          <Button
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={Close}
          />
        )}
      </Header>
      {subTitle && (
        <Text
          displayStyle={getSubTitleStyleBasedOnModalSize(size)}
          element={"p"}
        >
          {subTitle}
        </Text>
      )}
      {children}
    </ModalFrame>
  )
}

export default Modal

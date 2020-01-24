import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Battery from "Renderer/svg/battery.svg"
import Delete from "Renderer/svg/delete.svg"
import Message from "Renderer/svg/menu_messages.svg"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum Type {
  Battery,
  Delete,
  Message,
}

interface Props {
  type: Type
  badge?: boolean
}

const getIconType = (icon: Type): FunctionComponent<ImageInterface> => {
  switch (icon) {
    case Type.Battery:
      return Battery
    case Type.Message:
      return Message
    case Type.Delete:
      return Delete
    default:
      return Message
  }
}

const badgeStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -0.2rem;
    right: -0.3rem;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

const Wrapper = styled.div<{ badge?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  position: relative;

  svg {
    max-height: 100%;
    max-width: 100%;
  }

  ${({ badge }) => badge && badgeStyles};
`

const Icon: FunctionComponent<Props> = ({ type, badge = false }) => {
  return (
    <Wrapper data-testid="icon-wrapper" badge={badge}>
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon

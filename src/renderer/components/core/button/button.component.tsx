import React, { ComponentProps, MouseEventHandler } from "react"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"

import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

import styled from "styled-components"
import { DisplayStyle, Size, Type } from "./button.config"

import {
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
} from "./button.styled.elements"

interface Props {
  disabled?: boolean
  displayStyle?: DisplayStyle
  href?: string
  Icon?: FunctionComponent<ImageInterface>
  label?: string
  labelMessage?: MessageInterface
  onClick?: MouseEventHandler
  size?: Size
  target?: string
  to?: string
  type?: Type
}

const ButtonText = styled(Text)`
  white-space: nowrap;
`
// TODO: when icon component is ready, this has to be added as parent of StyledIcon alongside correct logic
// @ts-ignore
const Badge = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 0.8rem 0 0;
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -0.1rem;
    right: 0.5rem;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<Props> = ({
  className,
  disabled = false,
  displayStyle = DisplayStyle.Primary,
  href,
  Icon,
  label,
  labelMessage,
  size = Size.FixedBig,
  target,
  to,
  type = Type.Button,
  ...rest
}) => {
  let Component: FunctionComponent<ComponentProps<typeof StyledButton>>
  const filteredProps = {}

  if (to) {
    Component = StyledLink
    Object.assign(filteredProps, { to })
  } else if (href) {
    Component = StyledA
    Object.assign(filteredProps, { href, target })
  } else {
    Component = StyledButton
    Object.assign(filteredProps, { type, disabled })
  }

  const getLabel = () => {
    if (!label && !labelMessage) {
      return
    }
    if (label && labelMessage) {
      console.warn(
        "Button: button can not take label and labelMessage and the same time"
      )
      return
    }
    const textDisplayStyle =
      displayStyle === DisplayStyle.Link4
        ? TextDisplayStyle.LargeFadedText
        : TextDisplayStyle.SmallText

    if (labelMessage) {
      return (
        <ButtonText displayStyle={textDisplayStyle} message={labelMessage} />
      )
    }
    return <ButtonText displayStyle={textDisplayStyle}>{label}</ButtonText>
  }

  return (
    <Component
      {...filteredProps}
      {...rest}
      className={className}
      displaystyle={displayStyle}
      size={size}
      disabled={disabled}
    >
      {Icon && (
        <StyledIcon
          displaystyle={displayStyle}
          withMargin={Boolean(label || labelMessage)}
          Image={Icon}
        />
      )}
      {getLabel()}
    </Component>
  )
}

export default ButtonComponent

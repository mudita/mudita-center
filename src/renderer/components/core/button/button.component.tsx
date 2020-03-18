import React, { ComponentProps, MouseEventHandler } from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { DisplayStyle, Size, Type } from "./button.config"

import {
  activeClassName,
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
  StyledNavLink,
} from "./button.styled.elements"

interface Props {
  nav?: boolean
  exact?: boolean
  disabled?: boolean
  displayStyle?: DisplayStyle
  href?: string
  Icon?: IconType
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

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<Props> = ({
  className,
  disabled = false,
  displayStyle = DisplayStyle.Primary,
  exact,
  href,
  Icon,
  label,
  labelMessage,
  nav,
  size = Size.FixedBig,
  target,
  to,
  type = Type.Button,
  ...rest
}) => {
  let Component: FunctionComponent<ComponentProps<typeof StyledButton>>
  const filteredProps = {}

  if (to && nav) {
    Component = StyledNavLink
    Object.assign(filteredProps, {
      to,
      exact,
      activeClassName,
    })
  } else if (to) {
    Component = StyledLink
    Object.assign(filteredProps, { to })
  } else if (href) {
    Component = StyledA
    Object.assign(filteredProps, { href, target })
  } else {
    Component = StyledButton
    Object.assign(filteredProps, { type, disabled })
  }

  const getButtonTextDisplayStyle = (style: DisplayStyle) => {
    switch (style) {
      case DisplayStyle.Link4:
        return TextDisplayStyle.LargeFadedText
      case DisplayStyle.Tab:
        return TextDisplayStyle.LargeText
      default:
        return TextDisplayStyle.SmallText
    }
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

    if (labelMessage) {
      return (
        <ButtonText
          displayStyle={getButtonTextDisplayStyle(displayStyle)}
          message={labelMessage}
        />
      )
    }
    return (
      <ButtonText displayStyle={getButtonTextDisplayStyle(displayStyle)}>
        {label}
      </ButtonText>
    )
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
          type={Icon}
        />
      )}
      {getLabel()}
    </Component>
  )
}

export default ButtonComponent

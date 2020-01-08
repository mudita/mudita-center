import React, { ComponentProps, MouseEventHandler } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"

import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

import styled from "styled-components"
import {
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
} from "./button.styled.elements"

export enum DisplayStyle {
  Primary,
  Secondary,
  IconOnly1,
  IconOnly2,
  IconOnly3,
  Link1,
  Link2,
  Link3,
}

export enum Type {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

export enum Size {
  FixedSmall,
  FixedMedium,
  FixedBig,
}

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

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<Props> = ({
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
    }
    if (labelMessage) {
      return (
        <ButtonText
          displayStyle={TextDisplayStyle.SmallText}
          message={labelMessage}
        />
      )
    }
    return (
      <ButtonText displayStyle={TextDisplayStyle.SmallText}>{label}</ButtonText>
    )
  }

  return (
    <Component
      {...filteredProps}
      {...rest}
      displayStyle={displayStyle}
      size={size}
      disabled={disabled}
    >
      {Icon && (
        <StyledIcon
          displayStyle={displayStyle}
          withMargin={Boolean(label)}
          Image={Icon}
        />
      )}
      {getLabel()}
    </Component>
  )
}

export default ButtonComponent

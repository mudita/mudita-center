/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, MouseEventHandler, Ref } from "react"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { Message as MessageInterface } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
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
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { IconBadgeType } from "Core/__deprecated__/renderer/components/core/icon/icon-badge-type.constant"

export interface ButtonComponentProps {
  nav?: boolean
  exact?: boolean
  disableWhenActive?: boolean
  disabled?: boolean
  displayStyle?: DisplayStyle
  href?: string
  Icon?: IconType
  iconSize?: IconSize
  iconBadgeType?: IconBadgeType
  iconBadgeCountIndicator?: number
  label?: string | JSX.Element
  labelMessage?: MessageInterface
  onClick?: MouseEventHandler
  size?: Size
  target?: string
  to?: string
  type?: Type
  buttonRef?: Ref<HTMLElement>
  loading?: boolean
}

const ButtonText = styled(Text)`
  white-space: nowrap;
`

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({
  className,
  disabled = false,
  displayStyle = DisplayStyle.Primary,
  exact,
  disableWhenActive = true,
  href,
  Icon,
  iconSize = IconSize.Big,
  label,
  labelMessage,
  nav,
  size = Size.FixedMedium,
  target,
  to,
  type = Type.Button,
  buttonRef,
  loading,
  iconBadgeType,
  iconBadgeCountIndicator,
  ...rest
}) => {
  const badge =
    iconBadgeType === undefined &&
    displayStyle === DisplayStyle.BorderlessButton
      ? IconBadgeType.BadgeWithCounter
      : iconBadgeType
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any
  const filteredProps = {}

  if (to && nav) {
    Component = StyledNavLink
    Object.assign(filteredProps, {
      to,
      exact,
      disableWhenActive,
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

  const getButtonTextDisplayStyle = (style: DisplayStyle): TextDisplayStyle => {
    if (
      style === DisplayStyle.MenuLink ||
      style === DisplayStyle.Tab ||
      style === DisplayStyle.LinkWithParagraph ||
      style === DisplayStyle.BorderlessButton
    ) {
      return TextDisplayStyle.Paragraph1
    }
    return TextDisplayStyle.Button
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
      ref={buttonRef}
      className={className}
      displayStyle={displayStyle}
      size={size}
      disabled={disabled}
      badge={badge}
    >
      {loading && (
        <StyledIcon
          displayStyle={displayStyle}
          withMargin={Boolean(label || labelMessage)}
          type={IconType.Refresh}
          size={IconSize.Medium}
          badge={badge}
          badgeCountIndicator={iconBadgeCountIndicator}
          rotate
          disabled={disabled}
        />
      )}
      {Icon && (
        <StyledIcon
          displayStyle={displayStyle}
          withMargin={Boolean(label || labelMessage)}
          type={Icon}
          size={iconSize}
          badge={badge}
          badgeCountIndicator={iconBadgeCountIndicator}
          disabled={disabled}
        />
      )}
      {getLabel()}
    </Component>
  )
}

export default React.forwardRef<
  HTMLElement,
  ComponentProps<typeof ButtonComponent>
>((props, ref) => <ButtonComponent {...props} buttonRef={ref} />)

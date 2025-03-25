/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ComponentProps,
  FunctionComponent,
  JSX,
  MouseEventHandler,
  Ref,
} from "react"
import styled from "styled-components"
import {
  activeClassName,
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
  StyledNavLink,
} from "./button.styled.elements"
import { IconSize } from "../legacy-icon/icon.component"
import {
  LegacyButtonDisplayStyle,
  LegacyButtonSize,
  LegacyButtonType,
  LegacyIconBadgeType,
  LegacyIconType,
  TextDisplayStyle,
} from "app-theme/models"
import { FormattedMessage } from "react-intl"
import { LegacyText } from "../legacy-text/text.component"

export interface ButtonComponentProps {
  nav?: boolean
  exact?: boolean
  disableWhenActive?: boolean
  disabled?: boolean
  displayStyle?: LegacyButtonDisplayStyle
  href?: string
  Icon?: LegacyIconType
  iconSize?: IconSize
  iconBadgeType?: LegacyIconBadgeType
  iconBadgeCountIndicator?: number
  label?: string | JSX.Element
  labelMessage?: ComponentProps<typeof FormattedMessage> | string
  onClick?: MouseEventHandler
  size?: LegacyButtonSize
  target?: string
  to?: string
  type?: LegacyButtonType
  buttonRef?: Ref<HTMLElement>
  loading?: boolean
  className?: string
}

const ButtonText = styled(LegacyText)`
  white-space: nowrap;
`

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<ButtonComponentProps> = ({
  className,
  disabled = false,
  displayStyle = LegacyButtonDisplayStyle.Primary,
  exact,
  disableWhenActive = true,
  href,
  Icon,
  iconSize = IconSize.Big,
  label,
  labelMessage,
  nav,
  size = LegacyButtonSize.FixedMedium,
  target,
  to,
  type = LegacyButtonType.Button,
  buttonRef,
  loading,
  iconBadgeType,
  iconBadgeCountIndicator,
  ...rest
}) => {
  const badge =
    iconBadgeType === undefined &&
    displayStyle === LegacyButtonDisplayStyle.BorderlessButton
      ? LegacyIconBadgeType.BadgeWithCounter
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

  const getButtonTextDisplayStyle = (
    style: LegacyButtonDisplayStyle
  ): TextDisplayStyle => {
    if (
      style === LegacyButtonDisplayStyle.MenuLink ||
      style === LegacyButtonDisplayStyle.Tab ||
      style === LegacyButtonDisplayStyle.LinkWithParagraph ||
      style === LegacyButtonDisplayStyle.BorderlessButton
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
          type={LegacyIconType.Refresh}
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

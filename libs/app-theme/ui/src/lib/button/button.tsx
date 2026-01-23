/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react"
import { LinkProps, NavLink } from "react-router"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import {
  ButtonIcon,
  ButtonIconWrapper,
  ButtonTextWrapper,
  StyledButtonProps,
  StyledLinkProps,
} from "./button-base.styles"
import {
  primaryButtonStyles,
  primaryNavigationStyles,
} from "./button-primary.styles"
import {
  secondaryButtonStyles,
  secondaryNavigationStyles,
} from "./button-secondary.styles"
import { textButtonStyles, textNavigationStyles } from "./button-text.styles"
import { Translation } from "../shared/translation.type"
import styled from "styled-components"

export interface ButtonLinkProps {
  to: LinkProps["to"]
  target?: LinkProps["target"] | "appWindow"
  onClick?: MouseEventHandler
  end?: boolean
}

export interface ButtonDefaultProps {
  to?: undefined
  target?: undefined
  onClick?: MouseEventHandler
}

interface StandardButtonProps {
  type: Exclude<ButtonType, ButtonType.Text>
  modifiers?: undefined
}

interface TextButtonProps {
  type?: ButtonType.Text
  modifiers?: ButtonTextModifier[]
}

type Props = PropsWithChildren & {
  size?: ButtonSize
  icon?: IconType
  iconSize?: IconSize
  disabled?: boolean
  className?: string
} & Translation &
  (ButtonLinkProps | ButtonDefaultProps) &
  (StandardButtonProps | TextButtonProps)

export const Button: FunctionComponent<Props> & { Icon: typeof ButtonIcon } = ({
  type = ButtonType.Primary,
  size = ButtonSize.AutoMax,
  modifiers,
  message,
  values,
  icon,
  iconSize = type === ButtonType.Text ? 2.2 : IconSize.Small,
  to,
  target,
  onClick,
  disabled,
  children,
  ...rest
}) => {
  const NavigationComponent = useMemo(() => {
    if (!to) {
      return null
    }
    switch (type) {
      case ButtonType.Primary:
      case ButtonType.Secondary:
        return NavigationButtonComponent
      case ButtonType.Text:
        return NavigationTextButtonComponent
    }
  }, [to, type])

  const ButtonComponent = useMemo(() => {
    if (to) {
      return null
    }
    switch (type) {
      case ButtonType.Primary:
      case ButtonType.Secondary:
        return DefaultButtonComponent
      case ButtonType.Text:
        return DefaultTextButtonComponent
    }
  }, [to, type])

  const content = useMemo(() => {
    return (
      <>
        {icon && (
          <ButtonIconWrapper key={"icon"}>
            <ButtonIcon type={icon} size={iconSize} />
          </ButtonIconWrapper>
        )}
        <ButtonTextWrapper key={message || "text"}>
          {message ? <p>{formatMessage({ id: message }, values)}</p> : children}
        </ButtonTextWrapper>
      </>
    )
  }, [children, icon, iconSize, message, values])

  const linkClickHandler: MouseEventHandler = useCallback(
    async (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      const eventTarget = event.currentTarget.closest("a")
      // Handle internal links to be opened in a new window
      if (target === "appWindow" && eventTarget instanceof HTMLAnchorElement) {
        event.preventDefault()
        try {
          // eslint-disable-next-line @nx/enforce-module-boundaries
          const { AppActions } = await import("app-utils/renderer")
          AppActions.openWindow(eventTarget.hash)
        } catch {
          return
        }
        return
      }
      onClick?.(event)
    },
    [disabled, onClick, target]
  )

  if (to && NavigationComponent) {
    const linkTarget = retrieveLinkTarget(to, target)
    return (
      <NavigationComponent
        to={to}
        target={linkTarget}
        $size={size}
        $modifiers={modifiers}
        $disabled={disabled}
        $type={type}
        aria-disabled={disabled}
        onClick={linkClickHandler}
        {...rest}
      >
        {content}
      </NavigationComponent>
    )
  }

  if (!ButtonComponent) {
    return null
  }

  return (
    <ButtonComponent
      onClick={onClick}
      $size={size}
      $modifiers={modifiers}
      $type={type}
      disabled={disabled}
      {...rest}
    >
      {content}
    </ButtonComponent>
  )
}
Button.Icon = ButtonIcon

const retrieveLinkTarget = (
  to: LinkProps["to"],
  target: LinkProps["target"]
) => {
  if (target) {
    return target
  }
  if (typeof to === "string" && to.startsWith("http")) {
    return "_blank"
  }
  return undefined
}

const DefaultButtonComponent = styled.button<
  StyledButtonProps & {
    $type: ButtonType
    $iconSize?: IconSize | number
  }
>`
  ${({ $type }) => $type === ButtonType.Primary && primaryButtonStyles};
  ${({ $type }) => $type === ButtonType.Secondary && secondaryButtonStyles};

  ${ButtonIconWrapper} {
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const NavigationButtonComponent = styled(NavLink)<
  StyledLinkProps & {
    $type: ButtonType
    $iconSize?: IconSize | number
  }
>`
  ${({ $type }) => $type === ButtonType.Primary && primaryNavigationStyles};
  ${({ $type }) => $type === ButtonType.Secondary && secondaryNavigationStyles};

  ${ButtonIconWrapper} {
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const DefaultTextButtonComponent = styled.button<
  StyledButtonProps & { $iconSize?: IconSize | number }
>`
  ${textButtonStyles};
  ${ButtonIconWrapper} {
    margin-top: -0.2rem;
  }
`

const NavigationTextButtonComponent = styled(NavLink)<
  StyledLinkProps & { $iconSize?: IconSize | number }
>`
  ${textNavigationStyles};
  ${ButtonIconWrapper} {
    margin-top: -0.2rem;
  }
`

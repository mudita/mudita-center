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
import { LinkProps } from "react-router"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconType,
} from "app-theme/models"
import { ButtonIcon } from "./button-base.styles"
import {
  PrimaryButtonComponent,
  PrimaryNavigationComponent,
} from "./button-primary.styles"
import {
  SecondaryButtonComponent,
  SecondaryNavigationComponent,
} from "./button-secondary.styles"
import {
  TextButtonComponent,
  TextNavigationComponent,
} from "./button-text.styles"
import { formatMessage, Messages } from "app-localize/utils"

export interface ButtonLinkProps {
  to: LinkProps["to"]
  target?: LinkProps["target"] | "_window"
  onClick?: VoidFunction
}

export interface ButtonDefaultProps {
  to?: undefined
  target?: undefined
  onClick?: VoidFunction
}

interface StandardButtonProps {
  type: Exclude<ButtonType, ButtonType.Text>
  modifiers?: undefined
}

interface TextButtonProps {
  type?: ButtonType.Text
  modifiers?: ButtonTextModifier[]
}

type Translation =
  | {
      message: Messages["id"]
      values?: Record<string, string | number | boolean>
      children?: undefined
    }
  | {
      message?: undefined
      values?: undefined
      children?: PropsWithChildren["children"]
    }

type Props = PropsWithChildren & {
  size?: ButtonSize
  icon?: IconType
  disabled?: boolean
  className?: string
} & Translation &
  (ButtonLinkProps | ButtonDefaultProps) &
  (StandardButtonProps | TextButtonProps)

export const Button: FunctionComponent<Props> = ({
  type = ButtonType.Primary,
  size = ButtonSize.AutoMax,
  modifiers,
  message,
  values,
  icon,
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
        return PrimaryNavigationComponent
      case ButtonType.Secondary:
        return SecondaryNavigationComponent
      case ButtonType.Text:
        return TextNavigationComponent
    }
  }, [to, type])

  const ButtonComponent = useMemo(() => {
    if (to) {
      return null
    }
    switch (type) {
      case ButtonType.Primary:
        return PrimaryButtonComponent
      case ButtonType.Secondary:
        return SecondaryButtonComponent
      case ButtonType.Text:
        return TextButtonComponent
    }
  }, [to, type])

  const content = useMemo(() => {
    return (
      <>
        {icon && <ButtonIcon type={icon} />}
        {message ? formatMessage({ id: message }, values) : children}
      </>
    )
  }, [children, icon, message, values])

  const linkClickHandler: MouseEventHandler = useCallback(
    async (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      const eventTarget = event.currentTarget.closest("a")
      // Handle internal links to be opened in a new window
      if (target === "_window" && eventTarget instanceof HTMLAnchorElement) {
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
      onClick?.()
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
      disabled={disabled}
      {...rest}
    >
      {content}
    </ButtonComponent>
  )
}

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

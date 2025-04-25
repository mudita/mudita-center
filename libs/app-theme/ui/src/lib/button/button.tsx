/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, useMemo } from "react"
import { LinkProps } from "react-router"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconType,
} from "app-theme/models"
import { isEmpty } from "lodash"
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

interface ButtonLinkProps {
  to: LinkProps["to"]
  target?: LinkProps["target"]
  onClick?: undefined
}

interface ButtonDefaultProps {
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

type Props = PropsWithChildren & {
  size?: ButtonSize
  text?: string
  icon?: IconType
  disabled?: boolean
} & (ButtonLinkProps | ButtonDefaultProps) &
  (StandardButtonProps | TextButtonProps)

export const Button: FunctionComponent<Props> = ({
  type = ButtonType.Primary,
  size = ButtonSize.AutoMax,
  modifiers,
  text,
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
        {isEmpty(children) ? text : children}
      </>
    )
  }, [children, icon, text])

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
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            return
          }
        }}
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

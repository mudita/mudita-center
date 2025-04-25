/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, useMemo } from "react"
import { LinkProps } from "react-router"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
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
  TertiaryButtonComponent,
  TertiaryNavigationComponent,
} from "./button-tertiary.styles"

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

type Props = PropsWithChildren & {
  type?: ButtonType
  size?: ButtonSize
  text?: string
  icon?: IconType
  disabled?: boolean
} & (ButtonLinkProps | ButtonDefaultProps)

export const Button: FunctionComponent<Props> = ({
  type = ButtonType.Primary,
  size = ButtonSize.AutoMax,
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
      case ButtonType.Tertiary:
        return TertiaryNavigationComponent
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
      case ButtonType.Tertiary:
        return TertiaryButtonComponent
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

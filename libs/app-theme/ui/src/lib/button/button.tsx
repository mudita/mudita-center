/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
} from "react"
import styled, { css } from "styled-components"
import { Link, LinkProps } from "react-router"
import { IconType } from "app-theme/models"
import { Icon } from "../icon/icon"

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

type IconSize = ComponentProps<typeof Icon>["size"]

type StandardButtonProps = {
  type?: "primary" | "secondary" | "tertiary"
  size?: "auto-min" | "auto-max" | "small" | "medium" | "large"
}

type IconButtonProps = {
  type: "icon"
  size?: Omit<IconSize, "auto-min" | "auto-max">
}

type TypeSpecificProps = StandardButtonProps | IconButtonProps

type Props = PropsWithChildren &
  TypeSpecificProps & {
    icon?: IconType
    disabled?: boolean
    className?: string
  } & (ButtonLinkProps | ButtonDefaultProps)

export const Button: FunctionComponent<Props> = ({
  type = "primary",
  size = "auto-max",
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
      case "primary":
        return PrimaryNavigationComponent
      case "secondary":
        return SecondaryNavigationComponent
      case "tertiary":
        return TertiaryNavigationComponent
    }
  }, [to, type])

  const ButtonComponent = useMemo(() => {
    if (to) {
      return null
    }
    switch (type) {
      case "primary":
        return PrimaryButtonComponent
      case "secondary":
        return SecondaryButtonComponent
      case "tertiary":
        return TertiaryButtonComponent
      case "icon":
        return IconButtonComponent
    }
  }, [to, type])

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
        {icon && <ButtonIcon type={icon} />}
        {children}
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
      {type === "icon" && icon ? (
        <ButtonIcon type={icon} size={size as IconSize} />
      ) : (
        <>
          {icon && <ButtonIcon type={icon} />}
          {children}
        </>
      )}
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

type StyledButtonProps = {
  $size: Props["size"]
}
type StyledLinkProps = {
  $size: Props["size"]
  $disabled: Props["disabled"]
}

const ButtonIcon = styled(Icon)``

const baseStyles = css<StyledButtonProps>`
  border: none;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  appearance: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  user-select: none;

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return css`
          width: 11.8rem;
        `
      case "medium":
        return css`
          width: 15.6rem;
        `
      case "large":
        return css`
          width: 17.6rem;
        `
      case "auto-min":
        return css`
          width: fit-content;
        `
      case "auto-max":
        return css`
          width: auto;
        `
    }
  }}
`

const baseIconStyles = css`
  border: none;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  appearance: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: min-content;
  height: min-content;
  aspect-ratio: 1;
  transition-property: background-color, color;
  transition-duration: ${({ theme }) =>
    theme.app.constants.buttonTransitionDuration}ms;
  transition-timing-function: ease-in-out;
`

const primaryDefaultStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey1};
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  color: ${({ theme }) => theme.app.color.white};
  height: 4rem;

  ${ButtonIcon} {
    width: 2rem;
    height: 2rem;
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const primaryHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.black};
`

const primaryActiveStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey1};
`

const primaryDisabledStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey4};
  color: ${({ theme }) => theme.app.color.grey2};
  cursor: not-allowed;
`

const PrimaryButtonComponent = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${primaryDefaultStyles};

  &:hover {
    ${primaryHoverStyles};
  }
  &:active {
    ${primaryActiveStyles};
  }
  &:disabled {
    ${primaryDisabledStyles};
  }
`

const secondaryDefaultStyles = css`
  background-color: ${({ theme }) => theme.app.color.white};
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  color: ${({ theme }) => theme.app.color.black};
  height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.app.color.black};

  ${ButtonIcon} {
    width: 2rem;
    height: 2rem;
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const secondaryHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey5};
`

const secondaryActiveStyles = css`
  background-color: ${({ theme }) => theme.app.color.white};
`

const secondaryDisabledStyles = css`
  border-color: ${({ theme }) => theme.app.color.grey4};
  background-color: ${({ theme }) => theme.app.color.white};
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;
`

const SecondaryButtonComponent = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${secondaryDefaultStyles};

  &:hover {
    ${secondaryHoverStyles};
  }
  &:active {
    ${secondaryActiveStyles};
  }
  &:disabled {
    ${secondaryDisabledStyles};
  }
`

const tertiaryDefaultStyles = css`
  background-color: transparent;
  transition: color 0.15s ease-in-out;
  color: ${({ theme }) => theme.app.color.grey1};
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  height: 2.4rem;

  ${ButtonIcon} {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const tertiaryHoverStyles = css`
  color: ${({ theme }) => theme.app.color.black};
`

const tertiaryActiveStyles = css`
  color: ${({ theme }) => theme.app.color.grey1};
`

const tertiaryDisabledStyles = css`
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;
`

const TertiaryButtonComponent = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${tertiaryDefaultStyles};

  &:hover {
    ${tertiaryHoverStyles};
  }
  &:active {
    ${tertiaryActiveStyles};
  }
  &:disabled {
    ${tertiaryDisabledStyles};
  }
`

const iconButtonHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey6};
`

const iconButtonActiveStyles = css`
  background-color: transparent;
`

const iconButtonDisabledStyles = css`
  color: ${({ theme }) => theme.app.color.grey3};
  background-color: transparent;
  cursor: not-allowed;
`

const IconButtonComponent = styled.button<StyledButtonProps>`
  ${baseIconStyles};

  &:hover {
    ${iconButtonHoverStyles};
  }

  &:active {
    ${iconButtonActiveStyles};
  }

  &:disabled {
    ${iconButtonDisabledStyles};
  }
`

const PrimaryNavigationComponent = styled(Link)<StyledLinkProps>`
  ${baseStyles};
  ${primaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${primaryDisabledStyles};
        `
      : css`
          &:hover {
            ${primaryHoverStyles};
          }

          &:active {
            ${primaryActiveStyles};
          }
        `};
`

const SecondaryNavigationComponent = styled(Link)<StyledLinkProps>`
  ${baseStyles};
  ${secondaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${secondaryDisabledStyles};
        `
      : css`
          &:hover {
            ${secondaryHoverStyles};
          }

          &:active {
            ${secondaryActiveStyles};
          }
        `};
`

const TertiaryNavigationComponent = styled(Link)<StyledLinkProps>`
  ${baseStyles};
  ${tertiaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${tertiaryDisabledStyles};
        `
      : css`
          &:hover {
            ${tertiaryHoverStyles};
          }

          &:active {
            ${tertiaryActiveStyles};
          }
        `};
`

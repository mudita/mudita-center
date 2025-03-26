/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { Link, LinkProps } from "react-router"

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
  type?: "primary" | "secondary"
  size?: "auto" | "small" | "medium" | "large"
  disabled?: boolean
  className?: string
} & (ButtonLinkProps | ButtonDefaultProps)

export const Button: FunctionComponent<Props> = ({
  type = "primary",
  size = "auto",
  to,
  target,
  onClick,
  children,
  ...rest
}) => {
  if (to) {
    const LinkComponent = type === "primary" ? PrimaryLink : SecondaryLink

    const linkTarget = retrieveLinkTarget(to, target)
    return (
      <LinkComponent
        to={to}
        target={linkTarget}
        size={size}
        aria-disabled={rest.disabled}
        onClick={(e) => {
          if (rest.disabled) {
            e.preventDefault()
            return
          }
        }}
        {...rest}
      >
        {children}
      </LinkComponent>
    )
  }

  const ButtonComponent = type === "primary" ? PrimaryButton : SecondaryButton

  return (
    <ButtonComponent onClick={onClick} size={size} {...rest}>
      {children}
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

const buttonStyles = css<Pick<Props, "size">>`
  border: none;
  outline: none;
  appearance: none;
  background: transparent;
  box-sizing: border-box;
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

  ${({ size }) => {
    switch (size) {
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
      default:
        return css`
          width: min-content;
        `
    }
  }}
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

// const buttonIconStyles = css`
//   min-width: 3.2rem;
//   min-height: 3.2rem;
//   justify-content: center;
// `

const primaryDefaultStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey1};
  transition: background-color 0.15s ease-in-out;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  color: ${({ theme }) => theme.app.color.white};
  height: 4rem;
`

const secondaryDefaultStyles = css``

const PrimaryButton = styled.button<Pick<Props, "size">>`
  ${buttonStyles};
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

const SecondaryButton = styled.button<Pick<Props, "size">>`
  ${buttonStyles};
  ${secondaryDefaultStyles};
`

const PrimaryLink = styled(Link)<Pick<Props, "size" | "disabled">>`
  ${buttonStyles};
  ${primaryDefaultStyles};

  ${({ disabled }) =>
    disabled
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

const SecondaryLink = styled(Link)<Pick<Props, "size" | "disabled">>`
  ${buttonStyles};
  ${secondaryDefaultStyles};
`

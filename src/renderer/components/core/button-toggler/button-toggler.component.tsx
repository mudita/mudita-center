import React, { ReactElement } from "react"
import {
  ButtonTogglerItemProps,
  ButtonTogglerProps,
} from "Renderer/components/core/button-toggler/button-toggler.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { disabledSecondaryStyles } from "Renderer/components/core/button/button.styled.elements"
import { borderRadius } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const ButtonTogglerWrapper = styled.section`
  display: flex;
  flex-direction: row;
`

export const ButtonTogglerItem = styled(({ filled, active, ...props }) => (
  <ButtonComponent {...props} />
)).attrs<ButtonTogglerItemProps>(({ filled, active }) => {
  const displayStyle =
    active && filled ? DisplayStyle.Primary : DisplayStyle.Secondary
  return {
    displayStyle,
  }
})<ButtonTogglerItemProps>`
  --radius: ${borderRadius("medium")};
  flex: 1;
  z-index: 1;
  pointer-events: all;

  ${({ active }) =>
    active &&
    css`
      z-index: 3;
    `};

  &:disabled {
    pointer-events: none;
  }
  &:hover {
    z-index: 2;
  }
  &:not(:hover) {
    ${({ active }) => !active && disabledSecondaryStyles};
  }
  &:not(:first-of-type) {
    border-radius: 0;
    margin-left: -0.1rem;
  }
  &:first-of-type:not(:last-of-type) {
    border-radius: var(--radius) 0 0 var(--radius);
  }
  &:last-of-type:not(:first-of-type) {
    border-radius: 0 var(--radius) var(--radius) 0;
  }
`

const ButtonToggler: FunctionComponent<ButtonTogglerProps> = ({
  className,
  filled,
  children,
}) => {
  return (
    <ButtonTogglerWrapper className={className}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as ReactElement, {
          filled,
        })
      })}
    </ButtonTogglerWrapper>
  )
}

export default ButtonToggler

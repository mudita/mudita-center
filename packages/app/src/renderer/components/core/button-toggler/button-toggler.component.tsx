/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ReactElement } from "react"
import {
  ButtonTogglerItemProps,
  ButtonTogglerProps,
} from "Renderer/components/core/button-toggler/button-toggler.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { disabledSecondaryStyles } from "Renderer/components/core/button/button.styled.elements"
import { borderRadius, zIndex } from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { IconButtonWithPrimaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-primary-tooltip.component"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"
import transition from "Renderer/styles/functions/transition"
import theme from "Renderer/styles/theming/theme"

const ButtonTogglerWrapper = styled.section`
  display: flex;
  flex-direction: row;
  position: relative;
`

const buttonTogglerTransitionStyles = css`
  transition: ${transition(
      "background",
      theme.transitionTime.quick,
      theme.transitionTimingFunction.easeInOut
    )},
    ${transition(
      "color",
      theme.transitionTime.quick,
      theme.transitionTimingFunction.easeInOut
    )},
    ${transition(
      "border",
      theme.transitionTime.quick,
      theme.transitionTimingFunction.easeInOut
    )};
`

export const ButtonTogglerItem = styled(({ filled, active, ...props }) => (
  <ButtonComponent data-testid={ButtonTogglerTestIds.Item} {...props} />
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

  &,
  * {
    ${buttonTogglerTransitionStyles};
  }

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

const TooltipWrapper = styled.div`
  position: absolute;
  top: -0.8rem;
  left: -0.8rem;
  z-index: ${zIndex("tooltip")};
  &:hover {
    background-color: inherit;
  }
`

const ButtonToggler: FunctionComponent<ButtonTogglerProps> = ({
  className,
  filled,
  tooltipTitle,
  tooltipDescription,
  children,
}) => {
  return (
    <ButtonTogglerWrapper className={className}>
      {Boolean(tooltipTitle) &&
        Boolean(tooltipDescription) &&
        tooltipDescription && (
          <TooltipWrapper>
            <IconButtonWithPrimaryTooltip
              title={tooltipTitle}
              description={tooltipDescription}
            />
          </TooltipWrapper>
        )}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as ReactElement, {
          filled,
        })
      })}
    </ButtonTogglerWrapper>
  )
}

export default ButtonToggler

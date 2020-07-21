import React, { ReactElement } from "react"
import {
  ButtonTogglerItemProps,
  ButtonTogglerProps,
} from "Renderer/components/core/button-toggler/button-toggler.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { disabledSecondaryStyles } from "Renderer/components/core/button/button.styled.elements"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  transitionTime,
  zIndex,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"

const ButtonTogglerWrapper = styled.section`
  display: flex;
  flex-direction: row;
  position: relative;
`

export const ButtonTogglerItem = styled(ButtonComponent).attrs<
  ButtonTogglerItemProps
>(({ filled, active }) => {
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

const TooltipText = styled.div`
  width: max-content;
  max-width: 24.3rem;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
  position: absolute;
  top: 1rem;
  left: 0;
  opacity: 0;
  transition: opacity ${transitionTime("faster")}
    ${transitionTimingFunction("easeInOut")};
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("light")};
  z-index: ${zIndex("tooltip")};
`

const TooltipIcon = styled(Icon)`
  position: absolute;
  top: -0.8rem;
  left: -0.8rem;
  &:hover {
    + ${TooltipText} {
      visibility: visible;
      opacity: 1;
    }
  }
`

const TooltipTitle = styled(Text)`
  margin-bottom: 0.8rem;
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
      {Boolean(tooltipTitle) && Boolean(tooltipDescription) && (
        <>
          <TooltipIcon type={Type.Tooltip} height={1.6} width={1.6} />
          <TooltipText data-testid={ButtonTogglerTestIds.Tooltip}>
            <TooltipTitle
              displayStyle={TextDisplayStyle.MediumText}
              element={"p"}
              message={tooltipTitle}
            />
            <Text
              displayStyle={TextDisplayStyle.SmallFadedLightText}
              element={"p"}
              message={tooltipDescription}
            />
          </TooltipText>
        </>
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

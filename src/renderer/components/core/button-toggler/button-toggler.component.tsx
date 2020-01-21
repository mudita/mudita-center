import React from "react"
import { ButtonTogglerProps } from "Renderer/components/core/button-toggler/button-toggler.interface"
import ButtonComponent, {
  DisplayStyle,
} from "Renderer/components/core/button/button.component"
import { disabledSecondaryStyles } from "Renderer/components/core/button/button.styled.elements"
import { borderRadius } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const ButtonWrapper = styled(ButtonComponent)<{ inactive?: boolean }>`
  --radius: ${borderRadius("medium")};
  flex: 1;
  z-index: 1;
  pointer-events: all;

  ${({ inactive }) =>
    !inactive &&
    css`
      z-index: 3;
    `};

  &:hover {
    z-index: 2;
  }
  &:not(:hover) {
    ${({ inactive }) => inactive && disabledSecondaryStyles};
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

const ButtonTogglerWrapper = styled.section`
  display: flex;
  flex-direction: row;
`

const ButtonToggler: FunctionComponent<ButtonTogglerProps> = ({
  className,
  activeKey,
  options,
  onToggle,
  filled,
}) => {
  return (
    <ButtonTogglerWrapper className={className}>
      {options.map(({ key, label }) => {
        const active = activeKey === key
        const displayStyle =
          active && filled ? DisplayStyle.Primary : DisplayStyle.Secondary

        const onClickHandler = () => {
          onToggle(key)
        }

        return (
          <ButtonWrapper
            key={key.toString()}
            displayStyle={displayStyle}
            label={label}
            onClick={onClickHandler}
            inactive={!active}
          />
        )
      })}
    </ButtonTogglerWrapper>
  )
}

export default ButtonToggler

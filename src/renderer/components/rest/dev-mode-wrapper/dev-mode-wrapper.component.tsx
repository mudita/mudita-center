import React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"
import { intl } from "Renderer/utils/intl"

import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"

import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const stripe = textColor("grey")

const DevModeInside = styled.div`
  background: ${backgroundColor("light")};
  padding: 1.5rem;
  display: none;
`

const DevModeToggle = styled(ButtonComponent)`
  line-height: 3rem;
  width: auto;
  height: 3rem;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: 0;
  background: ${backgroundColor("light")};
`

const DevModeContainer = styled.div<{ active: boolean }>`
  position: sticky;

  ${({ active }) =>
    active &&
    css`
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        ${stripe} 10px,
        ${stripe} 20px
      );
      padding: 1.5rem;

      ${DevModeInside} {
        display: block;
      }

      ${DevModeToggle} {
        opacity: 0.5;
      }
    `}
  );
`

interface Props extends DevMode {
  children: React.ReactNode
}

const DevModeWrapper: FunctionComponent<Props> = ({
  children,
  isDevModeEnabled,
}) => {
  const [active, setActive] = React.useState(true)
  const toggleState = () => setActive(prevState => !prevState)

  if (isDevModeEnabled) {
    return (
      <DevModeContainer active={active}>
        <DevModeToggle
          label={intl.formatMessage({ id: "dev.action.toggle" })}
          onClick={toggleState}
          displayStyle={DisplayStyle.Secondary}
        />
        <DevModeInside>
          <Text displayStyle={TextDisplayStyle.LargeFadedText}>
            {intl.formatMessage({ id: "dev.view.wrapperName" })}
          </Text>
          {children}
        </DevModeInside>
      </DevModeContainer>
    )
  }

  return null
}

export default DevModeWrapper

import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"
import { intl } from "Renderer/utils/intl"

import { textColor } from "Renderer/styles/theming/theme-getters"

import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const stripe = textColor("grey")

const DevModeContainer = styled.div`
  background: repeating-linear-gradient(  45deg,
  transparent,
  transparent 10px,
  ${stripe} 10px,
  ${stripe} 20px);
  padding: 1.5rem;
);
`

const DevModeInside = styled.div`
  background: #fff;
  padding: 1.5rem;
`

interface Props extends DevMode {
  children: React.ReactNode
}

const DevModeWrapper: FunctionComponent<Props> = ({
  children,
  isDevModeEnabled,
}) => {
  if (isDevModeEnabled) {
    return (
      <DevModeContainer>
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

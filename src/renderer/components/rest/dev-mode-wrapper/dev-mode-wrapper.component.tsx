import React, { useState, ReactNode } from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DevModeWrapperTestIds } from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.enum"
import {
  DevModeContainer,
  DevModeInside,
  DevModeToggle,
} from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.styles"
import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"

import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"

interface DevModeProps extends DevMode {
  children: ReactNode
}

const DevModeWrapper: FunctionComponent<DevModeProps> = ({
  children,
  devModeEnabled,
}) => {
  const [active, setActive] = useState(true)
  const toggleState = () => setActive(prevState => !prevState)

  if (devModeEnabled) {
    return (
      <DevModeContainer
        active={active}
        data-testid={DevModeWrapperTestIds.Container}
      >
        <DevModeToggle
          label={intl.formatMessage({ id: "dev.action.toggle" })}
          onClick={toggleState}
          displayStyle={DisplayStyle.Secondary}
          data-testid={DevModeWrapperTestIds.ToggleButton}
        />
        <DevModeInside data-testid={DevModeWrapperTestIds.Inner}>
          <Text
            displayStyle={TextDisplayStyle.LargeFadedText}
            message={{ id: "dev.view.wrapperName" }}
          />
          {children}
        </DevModeInside>
      </DevModeContainer>
    )
  }

  return null
}

export default DevModeWrapper

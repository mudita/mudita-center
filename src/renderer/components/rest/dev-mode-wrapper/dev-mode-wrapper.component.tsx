import React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DevModeWrapperTestIds } from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.interface"
import {
  DevModeContainer,
  DevModeInside,
  DevModeToggle,
} from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.styles"
import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"

import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"

interface Props extends DevMode {
  children: React.ReactNode
}

const DevModeWrapper: FunctionComponent<Props> = ({
  children,
  devModeEnabled,
}) => {
  const [active, setActive] = React.useState(true)
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

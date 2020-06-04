import React from "react"

import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import { DevModeTestIds } from "Renderer/modules/help/devmode/devmode.interface"

import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"

interface Props {
  disable: () => void
}

const DevMode: FunctionComponent<Props> = ({ disable }) => {
  return (
    <>
      <p data-testid={DevModeTestIds.Wrapper}>
        {intl.formatMessage({ id: "dev.view.enabled" })}
      </p>
      <Button
        displayStyle={DisplayStyle.Secondary}
        label={intl.formatMessage({ id: "dev.action.disable" })}
        size={Size.FixedSmall}
        onClick={disable}
      />
    </>
  )
}

export default DevMode

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { TemplatesPanelProps } from "App/templates/components/templates-panel/templates-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
} from "App/templates/components/templates-panel/templates-panel.styled"
import { TemplatesPanelTestIds } from "App/templates/components/templates-panel/templates-panel-ids.enum"

const messages = defineMessages({
  newButton: { id: "module.templates.newButton" },
})

export const TemplatesPanel: FunctionComponent<TemplatesPanelProps> = ({
  disabled,
  onAddNewTemplate,
}) => {
  return (
    <PanelWrapper>
      <Panel>
        <ButtonWrapper>
          <Button
            data-testid={TemplatesPanelTestIds.Button}
            displayStyle={DisplayStyle.Primary}
            labelMessage={messages.newButton}
            onClick={onAddNewTemplate}
            disabled={disabled}
          />
        </ButtonWrapper>
      </Panel>
    </PanelWrapper>
  )
}

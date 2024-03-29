/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { TemplatesPanelProps } from "Core/templates/components/templates-panel/templates-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  TemplatesSelectionManager,
} from "Core/templates/components/templates-panel/templates-panel.styled"
import { TemplatesPanelTestIds } from "Core/templates/components/templates-panel/templates-panel-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"

const messages = defineMessages({
  newButton: { id: "module.templates.newButton" },
  deleteButton: { id: "module.templates.deleteButton" },
})

export const TemplatesPanel: FunctionComponent<TemplatesPanelProps> = ({
  disabled,
  onAddNewTemplate,
  selectedTemplates,
  allItemsSelected,
  onDeleteClick,
  toggleAll,
  resetRows,
}) => {
  const selectedItemsCount = selectedTemplates.length
  const selectionMode = selectedItemsCount > 0

  return (
    <PanelWrapper>
      <Panel>
        {selectionMode ? (
          <TemplatesSelectionManager
            data-testid={TemplatesPanelTestIds.SelectionManager}
            selectedItemsNumber={selectedItemsCount}
            allItemsSelected={Boolean(allItemsSelected)}
            message={{ id: "module.templates.selectionNumber" }}
            checkboxSize={Size.Medium}
            onToggle={allItemsSelected ? resetRows : toggleAll}
            buttons={[
              <Button
                key="delete"
                labelMessage={messages.deleteButton}
                displayStyle={DisplayStyle.Link}
                Icon={IconType.Delete}
                onClick={onDeleteClick}
              />,
            ]}
          />
        ) : (
          <ButtonWrapper>
            <Button
              data-testid={TemplatesPanelTestIds.Button}
              displayStyle={DisplayStyle.Primary}
              labelMessage={messages.newButton}
              onClick={onAddNewTemplate}
              disabled={disabled}
            />
          </ButtonWrapper>
        )}
      </Panel>
    </PanelWrapper>
  )
}

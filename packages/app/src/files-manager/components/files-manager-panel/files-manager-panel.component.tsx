/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { FilesManagerPanelProps } from "App/files-manager/components/files-manager-panel/files-manager-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  FilesManagerSelectionManager,
} from "App/files-manager/components/files-manager-panel/files-manager-panel.styles"
import { FilesManagerPanelTestIds } from "App/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"

const messages = defineMessages({
  uploadButton: { id: "module.filesManager.uploadButton" },
  deleteButton: { id: "module.filesManager.deleteButton" },
})

export const FilesManagerPanel: FunctionComponent<FilesManagerPanelProps> = ({
  disabled,
  onUploadFile,
  selectedFiles,
  allItemsSelected,
  onDeleteClick,
  toggleAll,
  resetRows,
}) => {
  const selectedItemsCount = selectedFiles.length
  const selectionMode = selectedItemsCount > 0

  return (
    <PanelWrapper>
      <Panel>
        {selectionMode ? (
          <FilesManagerSelectionManager
            data-testid={FilesManagerPanelTestIds.SelectionManager}
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
              data-testid={FilesManagerPanelTestIds.Button}
              displayStyle={DisplayStyle.Primary}
              labelMessage={messages.uploadButton}
              onClick={onUploadFile}
              disabled={disabled}
            />
          </ButtonWrapper>
        )}
      </Panel>
    </PanelWrapper>
  )
}

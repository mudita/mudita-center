/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeviceType } from "@mudita/pure"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { VisibleOnDevice } from "App/ui/components"
import { FilesManagerPanelProps } from "App/files-manager/components/files-manager-panel/files-manager-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  FilesManagerSelectionManager,
} from "App/files-manager/components/files-manager-panel/files-manager-panel.styled"
import { FilesManagerPanelTestIds } from "App/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import FilesManagerSearchInput from "App/files-manager/components/files-manager-search-input/files-manager-search-input"

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
  searchValue,
  onSearchValueChange,
}) => {
  const selectedItemsCount = selectedFiles.length
  const selectionMode = selectedItemsCount > 0

  return (
    <VisibleOnDevice devices={[DeviceType.MuditaPure]}>
      <PanelWrapper data-testid={FilesManagerPanelTestIds.Wrapper}>
        <Panel>
          {selectionMode ? (
            <FilesManagerSelectionManager
              data-testid={FilesManagerPanelTestIds.SelectionManager}
              selectedItemsNumber={selectedItemsCount}
              allItemsSelected={Boolean(allItemsSelected)}
              message={{ id: "module.filesManager.selectionNumber" }}
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
            <>
              <FilesManagerSearchInput
                data-testid={FilesManagerPanelTestIds.SearchInput}
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
              />
              <ButtonWrapper>
                <Button
                  data-testid={FilesManagerPanelTestIds.Button}
                  displayStyle={DisplayStyle.Primary}
                  labelMessage={messages.uploadButton}
                  onClick={onUploadFile}
                  disabled={disabled}
                />
              </ButtonWrapper>
            </>
          )}
        </Panel>
      </PanelWrapper>
    </VisibleOnDevice>
  )
}

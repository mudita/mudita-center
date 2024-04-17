/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback } from "react"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { FilesManagerPanelProps } from "Core/files-manager/components/files-manager-panel/files-manager-panel.interface"
import {
  PanelWrapper,
  Panel,
  ButtonWrapper,
  FilesManagerSelectionManager,
} from "Core/files-manager/components/files-manager-panel/files-manager-panel.styled"
import { FilesManagerPanelTestIds } from "Core/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Size } from "Core/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import FilesManagerSearchInput from "Core/files-manager/components/files-manager-search-input/files-manager-search-input"
import { resetAllItems, selectAllItems } from "Core/files-manager/actions"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"

const messages = defineMessages({
  uploadButton: { id: "module.filesManager.uploadButton" },
  deleteButton: { id: "module.filesManager.deleteButton" },
})

export const FilesManagerPanel: FunctionComponent<FilesManagerPanelProps> = ({
  disabled,
  onUploadFile,
  onDeleteClick,
  searchValue,
  onSearchValueChange,
}) => {
  const dispatch = useDispatch<Dispatch>()

  const { selectedItems, allItemsSelected } = useSelector(
    (state: ReduxRootState) => {
      const files = state.filesManager.files
      const selectedItems = state.filesManager.selectedItems.rows
      const allItemsSelected = selectedItems.length === (files?.length ?? 0)

      return { files, selectedItems, allItemsSelected }
    }
  )
  const selectedItemsCount = selectedItems.length
  const selectionMode = selectedItemsCount > 0

  const toggleAll = useCallback(() => {
    dispatch(selectAllItems())
  }, [dispatch])

  const resetRows = useCallback(() => {
    dispatch(resetAllItems())
  }, [dispatch])

  return (
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
  )
}

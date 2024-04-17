/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback } from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { FilesStorageTestIds } from "Core/files-manager/components/files-storage/files-storage-test-ids.enum"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import FilesStorageList from "Core/files-manager/components/files-storage-list/files-storage-list.component"
import { FilesManagerPanel } from "Core/files-manager/components/files-manager-panel"
import { FilesStorageProps } from "Core/files-manager/components/files-storage/files-storage.interface"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import { useFilesFilter } from "Core/files-manager/helpers/use-files-filter.hook"
import useCancelableFileUpload from "Core/files-manager/components/files-manager/use-cancelable-file-upload"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { resetAllItems, selectAllItems, toggleItem } from "Core/files-manager/actions"

const TitleWrapper = styled.div`
  padding: 1.6rem 3.2rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${backgroundColor("main")};
`

const messages = defineMessages({
  title: {
    id: "component.filesManagerFilesStorageTitle",
  },
})

const FilesStorage: FunctionComponent<FilesStorageProps> = ({
  state,
  onDeleteClick,
  onManagerDeleteClick,
  disableUpload,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const { files, selectedItems, allItemsSelected } = useSelector(
    (state: ReduxRootState) => {
      const files = state.filesManager.files
      const selectedItems = state.filesManager.selectedItems.rows
      const allItemsSelected = selectedItems.length === (files?.length ?? 0)

      return { files, selectedItems, allItemsSelected }
    }
  )
  const { noFoundFiles, searchValue, filteredFiles, handleSearchValueChange } =
    useFilesFilter({ files: files ?? [] })
  const { handleUploadFiles } = useCancelableFileUpload()

  const handleToggleRow = useCallback(
    (id: string) => {
      dispatch(toggleItem(id))
    },
    [dispatch]
  )

  const handleToggleAll = useCallback(() => {
    dispatch(selectAllItems())
  }, [dispatch])

  const handleResetRows = useCallback(() => {
    dispatch(resetAllItems())
  }, [dispatch])

  return (
    <>
      <TitleWrapper>
        <Text
          data-testid={FilesStorageTestIds.Title}
          displayStyle={TextDisplayStyle.Headline3}
          message={messages.title}
        />
      </TitleWrapper>
      <FilesManagerPanel
        onUploadFile={handleUploadFiles}
        disabled={disableUpload}
        toggleAll={handleToggleAll}
        resetRows={handleResetRows}
        onDeleteClick={onManagerDeleteClick}
        selectedFiles={selectedItems}
        allItemsSelected={allItemsSelected}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
      />
      <FilesStorageList
        data-testid={FilesStorageTestIds.List}
        files={filteredFiles}
        selectedItems={selectedItems}
        toggleRow={handleToggleRow}
        onDelete={onDeleteClick}
        state={state}
        noFoundFiles={noFoundFiles}
        hideCheckbox={searchValue !== ""}
      />
    </>
  )
}

export default FilesStorage

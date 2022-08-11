/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import FilesStorageList from "App/files-manager/components/files-storage-list/files-storage-list.component"
import { Feature, flags } from "App/feature-flags"
import { FilesManagerPanel } from "App/files-manager/components/files-manager-panel"
import { FilesStorageProps } from "App/files-manager/components/files-storage/files-storage.interface"

const TitleWrapper = styled.div`
  margin: 1.6rem 3.2rem 1rem;
`

const messages = defineMessages({
  title: {
    id: "component.filesManagerFilesStorageTitle",
  },
})

const FilesStorage: FunctionComponent<FilesStorageProps> = ({
  state,
  files = [],
  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
  onDeleteClick,
  onDeleteSelected,
  uploadFiles,
}) => {
  return (
    <>
      <TitleWrapper>
        <Text
          data-testid={FilesStorageTestIds.Title}
          displayStyle={TextDisplayStyle.Headline3}
          message={messages.title}
        />
      </TitleWrapper>
      {flags.get(Feature.FilesManagerActionsEnabled) && (
        <FilesManagerPanel
          onUploadFile={uploadFiles}
          disabled={false}
          toggleAll={selectAllItems}
          resetRows={resetAllItems}
          onDeleteClick={onDeleteSelected}
          selectedFiles={selectedItems}
          allItemsSelected={allItemsSelected}
        />
      )}
      <FilesStorageList
        data-testid={FilesStorageTestIds.List}
        files={files}
        selectedItems={selectedItems}
        toggleRow={toggleItem}
        onDelete={onDeleteClick}
        state={state}
      />
    </>
  )
}

export default FilesStorage

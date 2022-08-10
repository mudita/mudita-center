/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { File } from "App/files-manager/dto"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import { defineMessages } from "react-intl"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import FilesStorageList from "App/files-manager/components/files-storage-list/files-storage-list.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { FilesManagerPanel } from "App/files-manager/components/files-manager-panel"

const TitleWrapper = styled.div`
  margin: 1.6rem 3.2rem 1rem;
`

const messages = defineMessages({
  title: {
    id: "component.filesManagerFilesStorageTitle",
  },
})
interface Props {
  resultState: ResultState
  files: File[]
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  selectedItems: string[]
  allItemsSelected: boolean
  onDeleteClick: () => void
}

const FilesStorage: FunctionComponent<Props> = ({
  resultState,
  files = [],
  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
  onDeleteClick,
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
      <FilesManagerPanel
        onUploadFile={noop}
        disabled={false}
        toggleAll={selectAllItems}
        resetRows={resetAllItems}
        onDeleteClick={onDeleteClick}
        selectedFiles={selectedItems}
        allItemsSelected={allItemsSelected}
      />
      <FilesStorageList
        data-testid={FilesStorageTestIds.List}
        files={files}
        selectedItems={selectedItems}
        toggleRow={toggleItem}
        resultState={resultState}
        onDeleteClick={onDeleteClick}
      />
    </>
  )
}

export default FilesStorage

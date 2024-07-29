/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
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
import useCancelableFileUpload from "Core/files-manager/components/files-manager-core/use-cancelable-file-upload"
import getFilesByActiveSoundAppSelector from "Core/files-manager/selectors/get-files-by-active-sound-app.selector"

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
  const files = useSelector(getFilesByActiveSoundAppSelector)

  const { noFoundFiles, searchValue, filteredFiles, handleSearchValueChange } =
    useFilesFilter({ files: files ?? [] })
  const { handleUploadFiles } = useCancelableFileUpload()

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
        onDeleteClick={onManagerDeleteClick}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
      />
      <FilesStorageList
        data-testid={FilesStorageTestIds.List}
        files={filteredFiles}
        onDelete={onDeleteClick}
        state={state}
        noFoundFiles={noFoundFiles}
        hideCheckbox={searchValue !== ""}
      />
    </>
  )
}

export default FilesStorage

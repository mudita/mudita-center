/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { FileManagerFile } from "../manage-files.types"
import {
  ManageFilesStorageSummary,
  ManageFilesStorageSummaryProps,
} from "./manage-files-storage-summary"
import {
  ManageFilesCategoryList,
  ManageFilesCategoryListProps,
} from "./manage-files-category-list"
import {
  ManageFilesOtherFiles,
  ManageFilesOtherFilesProps,
} from "./manage-files-other-files"
import {
  ManageFilesFileListEmpty,
  ManageFilesFileListEmptyProps,
} from "./manage-files-file-list-empty"
import {
  FileListPanelHeaderProps,
  ManageFilesFileListPanelDefaultMode,
  ManageFilesFileListPanelSelectMode,
  ManageFilesFileListPanelSelectModeProps,
} from "./manage-files-file-list-panel"

interface Props
  extends ManageFilesStorageSummaryProps,
    ManageFilesCategoryListProps,
    ManageFilesOtherFilesProps,
    Pick<
      ManageFilesFileListPanelSelectModeProps,
      "onAllCheckboxClick" | "onDeleteClick"
    > {
  selectedFiles: FileManagerFile[]
  onAddFileClick?: () => void
  opened: boolean
  allFilesSelected: boolean
  messages: ManageFilesStorageSummaryProps["messages"] &
    ManageFilesFileListEmptyProps["messages"] &
    FileListPanelHeaderProps["messages"]
}

export const ManageFilesContent: FunctionComponent<
  Props & PropsWithChildren
> = ({
  opened,
  categories,
  segments,
  activeCategoryId,
  freeSpaceBytes,
  usedSpaceBytes,
  otherSpaceBytes,
  otherFiles,
  allFilesSelected,
  selectedFiles,
  onCategoryClick,
  onAllCheckboxClick,
  onDeleteClick,
  onAddFileClick,
  children,
  messages,
}) => {
  const activeCategory = categories.find(({ id }) => id === activeCategoryId)
  const emptyStateDescription = activeCategory?.fileListEmptyStateDescription
  const emptyStateVisible =
    activeCategory === undefined || activeCategory?.count === 0

  const fileListPanelHeader = `${activeCategory?.label} ${activeCategory?.count ? `(${activeCategory.count})` : ""}`

  if (!opened) {
    return null
  }

  return (
    <Wrapper>
      <CategoriesSidebar>
        <ManageFilesStorageSummary
          messages={messages}
          usedSpaceBytes={usedSpaceBytes}
          freeSpaceBytes={freeSpaceBytes}
          segments={segments}
        />
        <ManageFilesCategoryList
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryClick={onCategoryClick}
        />
        <ManageFilesOtherFiles
          otherFiles={otherFiles}
          otherSpaceBytes={otherSpaceBytes}
        />
      </CategoriesSidebar>
      <FileList>
        {emptyStateVisible && (
          <ManageFilesFileListEmpty
            description={emptyStateDescription}
            header={fileListPanelHeader}
            onAddFileClick={onAddFileClick}
            messages={messages}
          />
        )}
        {!emptyStateVisible && (
          <>
            <FileListPanel>
              {selectedFiles.length === 0 ? (
                <ManageFilesFileListPanelDefaultMode
                  header={fileListPanelHeader}
                  onAddFileClick={onAddFileClick}
                  messages={messages}
                />
              ) : (
                <ManageFilesFileListPanelSelectMode
                  count={selectedFiles.length}
                  onAllCheckboxClick={onAllCheckboxClick}
                  onDeleteClick={onDeleteClick}
                  allFilesSelected={allFilesSelected}
                />
              )}
            </FileListPanel>
            {children}
          </>
        )}
      </FileList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.app.color.white};
  display: grid;
  grid-template-columns: 31.2rem auto;
  overflow: auto;
`

const CategoriesSidebar = styled.div`
  flex-grow: 1;
`

const FileList = styled.div`
  width: 100%;
  min-width: 65.6rem;
  display: grid;
  border-left: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  grid-template-rows: auto 1fr;
`

const FileListPanel = styled.div`
  grid-area: 1 / 1 / 2 / 2;
`

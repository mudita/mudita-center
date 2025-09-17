/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { MfStorageSummary, MfStorageSummaryProps } from "./mf-storage-summary"
import { MfCategoryList, MfCategoryListProps } from "./mf-category-list"
import { MfOtherFiles, MfOtherFilesProps } from "./mf-other-files"
import { MfFileListEmpty } from "./mf-file-list-empty"

import {
  MfFileListPanelDefaultMode,
  MfFileListPanelSelectMode,
  MfFileListPanelSelectModeProps,
} from "./mf-file-list-panel"
import { FileManagerFile } from "./manage-files.types"

interface Props
  extends MfStorageSummaryProps,
    MfCategoryListProps,
    MfOtherFilesProps,
    Pick<
      MfFileListPanelSelectModeProps,
      "onAllCheckboxClick" | "onDeleteClick"
    > {
  selectedFiles: FileManagerFile[]
  opened: boolean
}

export const ManageFiles: FunctionComponent<Props & PropsWithChildren> = ({
  opened,
  categories,
  segments,
  activeCategoryId,
  summaryHeader,
  freeSpaceBytes,
  usedSpaceBytes,
  otherSpaceBytes,
  otherFiles,
  selectedFiles,
  onCategoryClick,
  onAllCheckboxClick,
  onDeleteClick,
  children,
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
        <MfStorageSummary
          summaryHeader={summaryHeader}
          usedSpaceBytes={usedSpaceBytes}
          freeSpaceBytes={freeSpaceBytes}
          segments={segments}
        />
        <MfCategoryList
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryClick={onCategoryClick}
        />
        <MfOtherFiles
          otherFiles={otherFiles}
          otherSpaceBytes={otherSpaceBytes}
        />
      </CategoriesSidebar>
      <FileList>
        {emptyStateVisible && (
          <MfFileListEmpty
            description={emptyStateDescription}
            header={fileListPanelHeader}
          />
        )}
        {!emptyStateVisible && (
          <>
            <FileListPanel>
              {selectedFiles.length === 0 ? (
                <MfFileListPanelDefaultMode header={fileListPanelHeader} />
              ) : (
                <MfFileListPanelSelectMode
                  count={selectedFiles.length}
                  onAllCheckboxClick={onAllCheckboxClick}
                  onDeleteClick={onDeleteClick}
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

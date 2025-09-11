/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { MfStorageSummary } from "./mf-storage-summary"
import { MfCategoryList } from "./mf-category-list"
import { MfOtherFiles } from "./mf-other-files"
import { MfFileListEmpty } from "./mf-file-list-empty"

import {
  MfFileListPanelDefaultMode,
  MfFileListPanelSelectMode,
} from "./mf-file-list-panel"
import { FileManagerFile } from "./manage-files.types"

interface Props
  extends ComponentProps<typeof MfStorageSummary>,
    ComponentProps<typeof MfCategoryList>,
    ComponentProps<typeof MfOtherFiles> {
  selectedFiles: FileManagerFile[]
}

export const ManageFiles: FunctionComponent<Props & PropsWithChildren> = ({
  categories,
  segments,
  activeCategoryId,
  summaryHeader,
  freeSpaceBytes,
  usedSpaceBytes,
  otherSpaceBytes,
  otherFiles,
  selectedFiles,
  children,
}) => {
  const activeCategory = categories.find(({ id }) => id === activeCategoryId)
  const emptyStateDescription = activeCategory?.fileListEmptyStateDescription
  const emptyStateVisible =
    activeCategory === undefined || activeCategory?.count === 0

  const fileListPanelHeader = `${activeCategory?.label} ${activeCategory?.count ? `(${activeCategory.count})` : ""}`

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
                <MfFileListPanelSelectMode count={selectedFiles.length} />
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

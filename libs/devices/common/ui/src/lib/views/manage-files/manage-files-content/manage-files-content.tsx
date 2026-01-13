/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react"
import styled from "styled-components"
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
import { useFormContext } from "react-hook-form"
import { ManageFilesFormValues } from "../manage-files-form"
import { AnimatePresence, motion } from "motion/react"

interface Props
  extends
    ManageFilesStorageSummaryProps,
    ManageFilesCategoryListProps,
    ManageFilesOtherFilesProps,
    Pick<
      ManageFilesFileListPanelSelectModeProps,
      "onDeleteClick" | "onDownloadClick"
    > {
  onAddFileClick?: () => void
  filesIds: string[]
  messages: ManageFilesStorageSummaryProps["messages"] &
    ManageFilesFileListEmptyProps["messages"] &
    FileListPanelHeaderProps["messages"]
}

export const ManageFilesContent: FunctionComponent<
  Props & PropsWithChildren
> = ({
  categories,
  segments,
  activeCategoryId,
  freeSpaceBytes,
  usedSpaceBytes,
  otherSpaceBytes,
  otherFiles,
  onCategoryClick,
  onDeleteClick,
  onDownloadClick,
  onAddFileClick,
  filesIds,
  children,
  messages,
}) => {
  const activeCategory = categories.find(({ id }) => id === activeCategoryId)
  const emptyStateDescription = activeCategory?.fileListEmptyStateDescription
  const emptyStateVisible =
    activeCategory === undefined || activeCategory?.count === 0

  const fileListPanelHeader = `${activeCategory?.label} ${activeCategory?.count ? `(${activeCategory.count})` : ""}`

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
            <Panel
              filesIds={filesIds}
              onDeleteClick={onDeleteClick}
              onDownloadClick={onDownloadClick}
              onAddFileClick={onAddFileClick}
              fileListPanelHeader={fileListPanelHeader}
              messages={messages}
            />
            {children}
          </>
        )}
      </FileList>
    </Wrapper>
  )
}

const Panel: FunctionComponent<{
  filesIds: string[]
  onDeleteClick: VoidFunction
  onDownloadClick?: VoidFunction
  onAddFileClick?: VoidFunction
  fileListPanelHeader: string
  messages: Props["messages"]
}> = ({
  filesIds,
  onDeleteClick,
  onDownloadClick,
  onAddFileClick,
  fileListPanelHeader,
  messages,
}) => {
  const { watch, setValue } = useFormContext<ManageFilesFormValues>()
  const selectedFiles = watch("selectedFiles")

  const selectedCount = Object.entries(selectedFiles).filter(
    ([, checked]) => checked
  ).length
  const totalCount = filesIds.length

  const allFilesSelected = useMemo(() => {
    return selectedCount === totalCount
  }, [selectedCount, totalCount])

  const onAllToggle = useCallback(() => {
    if (allFilesSelected) {
      setValue(
        "selectedFiles",
        Object.fromEntries(filesIds.map((id) => [id, false]))
      )
    } else {
      setValue(
        "selectedFiles",
        Object.fromEntries(filesIds.map((id) => [id, true]))
      )
    }
  }, [allFilesSelected, setValue, filesIds])

  return (
    <AnimatePresence initial={false} mode={"popLayout"}>
      {selectedCount === 0 ? (
        <FileListPanel
          key={"default-mode"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ManageFilesFileListPanelDefaultMode
            header={fileListPanelHeader}
            onAddFileClick={onAddFileClick}
            messages={messages}
          />
        </FileListPanel>
      ) : (
        <FileListPanel
          key={"select-mode"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ManageFilesFileListPanelSelectMode
            count={selectedCount}
            onAllCheckboxClick={onAllToggle}
            onDeleteClick={onDeleteClick}
            onDownloadClick={onDownloadClick}
            allFilesSelected={allFilesSelected}
          />
        </FileListPanel>
      )}
    </AnimatePresence>
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
  overflow: hidden;
`

const FileListPanel = styled(motion.div)`
  grid-area: 1 / 1 / 2 / 2;
`

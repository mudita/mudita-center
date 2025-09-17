/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react"
import { MfStorageSummaryProps } from "./mf-storage-summary"
import { MfCategoryListProps } from "./mf-category-list"
import {
  FileManagerFile,
  FileManagerFileMap,
  ManageFilesTableSectionProps,
} from "./manage-files.types"
import { ManageFiles } from "./manage-files"
import { ManageFilesLoadingState } from "./manage-files-loading-state"
import {
  ManageFilesDeleteFlow,
  ManageFilesDeleteFlowProps,
} from "./manage-files-delete-flow"
import { MfOtherFilesProps } from "./mf-other-files"

type ManageFilesViewChild = (
  ctx: Pick<ManageFilesTableSectionProps, "onSelectedChange" | "selectedIds">
) => ReactNode

interface Props
  extends MfStorageSummaryProps,
    MfCategoryListProps,
    MfOtherFilesProps,
    Pick<
      ManageFilesDeleteFlowProps,
      "handleDeleteFile" | "onDeleteSuccess" | "deleteFlowMessages"
    > {
  activeFileMap: FileManagerFileMap
  onActiveCategoryChange: (categoryId: string) => void
  isLoading: boolean
  children: ManageFilesViewChild
}

export const ManageFilesView: FunctionComponent<Props> = (props) => {
  const {
    deleteFlowMessages,
    activeCategoryId,
    activeFileMap,
    onActiveCategoryChange,
    handleDeleteFile,
    onDeleteSuccess,
    isLoading,
    categories,
    segments,
    summaryHeader,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    otherFiles,
    children,
  } = props
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const [deleteFlowOpened, setDeleteFlowOpened] = useState(false)

  const selectedFiles: FileManagerFile[] = useMemo(() => {
    const out: FileManagerFile[] = []
    selectedIds.forEach((id) => {
      const file = activeFileMap[id]
      if (file) out.push(file)
    })
    return out
  }, [selectedIds, activeFileMap])

  const handleSelectedChange = useCallback(
    (fileId: string, checked: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        checked ? next.add(fileId) : next.delete(fileId)
        return next
      })
    },
    []
  )

  const handleAllCheckboxClick = useCallback(
    (checked: boolean) => {
      setSelectedIds(() =>
        checked ? new Set(Object.keys(activeFileMap)) : new Set()
      )
    },
    [activeFileMap]
  )

  const handleDeleteClick = useCallback(() => {
    setDeleteFlowOpened(true)
  }, [])

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      if (categoryId === activeCategoryId) {
        return
      }
      setSelectedIds(new Set())
      onActiveCategoryChange(categoryId)
    },
    [activeCategoryId, onActiveCategoryChange]
  )

  const loadingState =
    (isLoading && !deleteFlowOpened) || activeCategoryId === undefined

  const handleSuccessfulDelete = useCallback(async () => {
    onDeleteSuccess && (await onDeleteSuccess())
    setSelectedIds(new Set())
    setDeleteFlowOpened(false)
  }, [onDeleteSuccess])

  const handlePartialDeleteFailure = useCallback(
    async (failedFiles: FileManagerFile[]) => {
      if (failedFiles.length === selectedFiles.length) {
        setDeleteFlowOpened(false)
      } else {
        setDeleteFlowOpened(false)
        onDeleteSuccess && (await onDeleteSuccess())
        setSelectedIds(() => {
          const next = new Set<string>()
          failedFiles.forEach((file) => next.add(file.id))
          return next
        })
      }
    },
    [onDeleteSuccess, selectedFiles.length]
  )

  return (
    <>
      <ManageFilesLoadingState opened={loadingState} />
      <ManageFiles
        opened={!loadingState}
        segments={segments}
        categories={categories}
        activeCategoryId={activeCategoryId}
        summaryHeader={summaryHeader}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        otherFiles={otherFiles}
        selectedFiles={selectedFiles}
        onCategoryClick={handleCategoryClick}
        onAllCheckboxClick={handleAllCheckboxClick}
        onDeleteClick={handleDeleteClick}
      >
        {children({ onSelectedChange: handleSelectedChange, selectedIds })}
      </ManageFiles>
      <ManageFilesDeleteFlow
        opened={deleteFlowOpened}
        onClose={() => setDeleteFlowOpened(false)}
        selectedFiles={selectedFiles}
        onDeleteSuccess={handleSuccessfulDelete}
        onPartialDeleteFailure={handlePartialDeleteFailure}
        handleDeleteFile={handleDeleteFile}
        deleteFlowMessages={deleteFlowMessages}
      />
    </>
  )
}

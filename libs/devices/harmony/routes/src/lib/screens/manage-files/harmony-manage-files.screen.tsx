/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useMemo, useState } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { defineMessages, formatMessage } from "app-localize/utils"
import {
  FileManagerFile,
  ManageFiles,
  ManageFilesLoadingState,
} from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { FileCategoryId } from "./harmony-manage-files.types"
import { useActiveDeviceQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"

const messages = defineMessages({
  pageTitle: {
    id: "page.manageFiles.title",
  },
  summaryHeader: {
    id: "manageFiles.summary.harmonyHeader",
  },
})

export const HarmonyManageFilesScreen: FunctionComponent = () => {
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()
  const {
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  } = useHarmonyManageFiles(activeDevice)

  const [activeCategoryId, setActiveCategoryId] = useState<
    FileCategoryId | undefined
  >(categories[0]?.id)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const activeFileMap = useMemo(
    () => (activeCategoryId ? (categoryFileMap[activeCategoryId] ?? {}) : {}),
    [activeCategoryId, categoryFileMap]
  )

  const selectedFiles: FileManagerFile[] = useMemo(() => {
    const out: FileManagerFile[] = []
    selectedIds.forEach((id) => {
      const f = activeFileMap[id]
      if (f) out.push(f)
    })
    return out
  }, [selectedIds, activeFileMap])

  const handleCheckboxClick = useCallback(
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

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedIds(new Set())
    setActiveCategoryId(categoryId as FileCategoryId)
  }, [])

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      {isLoading || activeCategoryId === undefined ? (
        <ManageFilesLoadingState />
      ) : (
        <ManageFiles
          segments={segments}
          categories={categories}
          activeCategoryId={activeCategoryId}
          summaryHeader={formatMessage(messages.summaryHeader)}
          freeSpaceBytes={freeSpaceBytes}
          usedSpaceBytes={usedSpaceBytes}
          otherSpaceBytes={otherSpaceBytes}
          otherFiles={[{ name: "System" }, { name: "Other" }]}
          selectedFiles={selectedFiles}
          onCategoryClick={handleCategoryClick}
          onAllCheckboxClick={handleAllCheckboxClick}
        >
          <HarmonyManageFilesTableSection
            fileMap={activeCategoryId ? categoryFileMap[activeCategoryId] : {}}
            onCheckboxClick={handleCheckboxClick}
            selectedIds={selectedIds}
          />
        </ManageFiles>
      )}
    </>
  )
}

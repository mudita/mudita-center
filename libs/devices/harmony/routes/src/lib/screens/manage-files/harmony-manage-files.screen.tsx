/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useState } from "react"
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

const messages = defineMessages({
  pageTitle: {
    id: "page.manageFiles.title",
  },
  summaryHeader: {
    id: "manageFiles.summary.harmonyHeader",
  },
})

export const HarmonyManageFilesScreen: FunctionComponent = () => {
  const {
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  } = useHarmonyManageFiles()

  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id)
  const [selectedFiles, setSelectedFiles] = useState<FileManagerFile[]>([])

  const handleCheckboxClick = (fileId: string, checked: boolean) => {
    const fileMap = categoryFileMap[activeCategoryId] || {}
    const file = fileMap[fileId]
    if (!file) {
      return
    }

    if (checked) {
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file])
    } else {
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((f) => f.id !== fileId)
      )
    }
  }

  const handleAllCheckboxClick = (checked: boolean) => {
    if (checked) {
      const fileMap = categoryFileMap[activeCategoryId] || {}
      const allFiles = Object.values(fileMap)
      setSelectedFiles(allFiles)
    } else {
      setSelectedFiles([])
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedFiles([])
    setActiveCategoryId(categoryId as FileCategoryId)
  }

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      {isLoading ? (
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
            selectedFiles={selectedFiles}
          />
        </ManageFiles>
      )}
    </>
  )
}

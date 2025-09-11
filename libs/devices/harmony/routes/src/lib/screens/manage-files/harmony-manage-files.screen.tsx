/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { defineMessages, formatMessage } from "app-localize/utils"
import { ManageFiles } from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"

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
    isError,
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  } = useHarmonyManageFiles()

  console.log("isError, isLoading, data", isError, isLoading, {
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
  })

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <ManageFiles
        segments={segments}
        categories={categories}
        activeCategoryId={categories[0]?.id}
        summaryHeader={formatMessage(messages.summaryHeader)}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        otherFiles={[{ name: "System" }, { name: "Other" }]}
        selectedFiles={[]}
      >
        <HarmonyManageFilesTableSection
          fileMap={categories[0]?.id ? categoryFileMap[categories[0]?.id] : {}}
          onCheckboxClick={() => undefined}
        />
      </ManageFiles>
    </>
  )
}

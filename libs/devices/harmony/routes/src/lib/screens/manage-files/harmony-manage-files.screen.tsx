/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo, useState } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useHarmonyDeleteFileMutation } from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import { ManageFilesView } from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { FileCategoryId } from "./harmony-manage-files.types"

const messages = defineMessages({
  pageTitle: {
    id: "page.manageFiles.title",
  },
  summaryHeader: {
    id: "harmony.manageFiles.summary.header",
  },
  confirmDeleteModalTitle: {
    id: "harmony.manageFiles.confirmDelete.modal.title",
  },
  confirmDeleteModalDescription: {
    id: "harmony.manageFiles.confirmDelete.modal.description",
  },
  confirmDeleteModalPrimaryButtonText: {
    id: "harmony.manageFiles.confirmDelete.modal.primaryButtonText",
  },
  confirmDeleteModalSecondaryButtonText: {
    id: "harmony.manageFiles.confirmDelete.modal.secondaryButtonText",
  },
  otherFilesSystemLabelText: {
    id: "harmony.manageFiles.otherFilesSystemLabelText",
  },
  otherFilesOtherLabelText: {
    id: "harmony.manageFiles.otherFilesOtherLabelText",
  },
  deleteFailedAllModalTitle: {
    id: "harmony.manageFiles.deleteFailed.all.modal.title",
  },
  deleteFailedSomeModalTitle: {
    id: "harmony.manageFiles.deleteFailed.some.modal.title",
  },
  deleteFailedAllModalDescription: {
    id: "harmony.manageFiles.deleteFailed.all.modal.description",
  },
  deleteFailedDescriptionModalDescription: {
    id: "harmony.manageFiles.deleteFailed.some.modal.description",
  },
  deleteFailedModalSecondaryButtonText: {
    id: "harmony.manageFiles.deleteFailed.modal.secondaryButtonText",
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
    refetch,
  } = useHarmonyManageFiles(activeDevice)

  const { mutateAsync: deleteFile } = useHarmonyDeleteFileMutation(activeDevice)

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id
  )

  const activeFileMap = useMemo(
    () =>
      activeCategoryId
        ? (categoryFileMap[activeCategoryId as FileCategoryId] ?? {})
        : {},
    [activeCategoryId, categoryFileMap]
  )

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <ManageFilesView
        activeCategoryId={activeCategoryId}
        activeFileMap={activeFileMap}
        onActiveCategoryChange={setActiveCategoryId}
        segments={segments}
        categories={categories}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        handleDeleteFile={deleteFile}
        onDeleteSuccess={refetch}
        isLoading={isLoading}
        otherFiles={[
          { name: formatMessage(messages.otherFilesSystemLabelText) },
          { name: formatMessage(messages.otherFilesOtherLabelText) },
        ]}
        summaryHeader={formatMessage(messages.summaryHeader)}
        deleteFlowMessages={messages}
      >
        {(props) => (
          <HarmonyManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFilesView>
    </>
  )
}

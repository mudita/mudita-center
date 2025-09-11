/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DashboardHeaderTitle } from "app-routing/feature"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"

const messages = defineMessages({
  pageTitle: {
    id: "page.manageFiles.title",
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

  return <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
}

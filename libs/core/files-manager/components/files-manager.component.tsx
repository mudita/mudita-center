/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import FilesManagerCore from "Core/files-manager/components/files-manager-core/files-manager-core.component"
import { setActiveSoundApp } from "Core/files-manager/actions"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import FilesStorage from "Core/files-manager/components/files-storage/files-storage.component"
import { filesManagerSummaryElements } from "Core/files-manager/constants"
import { defineMessages } from "react-intl"

export const messages = defineMessages({
  summaryTitle: { id: "component.filesManagerSummaryTitle" },
})

const FilesManager = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(setActiveSoundApp("PURE_MUSIC"))
  }, [dispatch])

  return (
    <FilesManagerCore
      filesSummaryElements={filesManagerSummaryElements}
      summaryTitleMessage={messages.summaryTitle}
    >
      {(props) => <FilesStorage {...props} />}
    </FilesManagerCore>
  )
}

export default FilesManager

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import FilesManagerCore from "Core/files-manager/components/files-manager-core/files-manager-core.component"
import { setActiveSoundApp } from "Core/files-manager/actions"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import ManageSoundsStorage from "Core/files-manager/components/manage-sounds-storage/manage-sounds-storage.component"
import { managerSoundsSummaryElements } from "Core/files-manager/constants"
import { defineMessages } from "react-intl"

export const messages = defineMessages({
  summaryTitle: { id: "component.manageSoundsSummaryTitle" },
})

const ManageSounds = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(setActiveSoundApp("HARMONY_SOUNDS"))
  }, [dispatch])

  return (
    <FilesManagerCore
      filesSummaryElements={managerSoundsSummaryElements}
      summaryTitleMessage={messages.summaryTitle}
    >
      {(props) => <ManageSoundsStorage {...props} />}
    </FilesManagerCore>
  )
}

export default ManageSounds

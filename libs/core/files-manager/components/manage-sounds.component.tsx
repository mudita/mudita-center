/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import FilesManagerCore from "Core/files-manager/components/files-manager-core/files-manager-core.component"
import { setActiveSoundApp } from "Core/files-manager/actions"
import { Dispatch } from "Core/__deprecated__/renderer/store"

const ManageSounds = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(setActiveSoundApp("HARMONY_RELAXATION"))
  }, [dispatch])

  return <FilesManagerCore />
}

export default ManageSounds

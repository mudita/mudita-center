/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { refreshBackupList } from "../backup/refresh-backup-list.action"

export const useBackupList = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshBackupList())
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return undefined
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { refreshBackupList } from "../backup/refresh-backup-list.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"

export const useBackupList = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeApiDeviceId = useSelector(selectActiveApiDeviceId)

  useEffect(() => {
    if (!activeApiDeviceId) {
      return
    }

    const interval = setInterval(() => {
      dispatch(refreshBackupList({ disableErrorLog: true }))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [dispatch, activeApiDeviceId])
}

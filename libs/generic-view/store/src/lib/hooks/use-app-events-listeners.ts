/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerMain, AppEvents } from "shared/utils"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { refreshBackupList } from "../backup/refresh-backup-list.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"

export const useAppEventsListeners = () => {
  const dispatch = useDispatch<Dispatch>()
  const activeApiDeviceId = useSelector(selectActiveApiDeviceId)

  useEffect(() => {
    if (!activeApiDeviceId) {
      return
    }

    const unregisterWindowFocusedListener = answerMain(
      AppEvents.WindowFocused,
      () => {
        dispatch(refreshBackupList({ disableErrorLog: true }))
      }
    )

    return () => {
      unregisterWindowFocusedListener()
    }
  }, [dispatch, activeApiDeviceId])
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain, AppEvents } from "shared/utils"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { refreshBackupList } from "../backup/refresh-backup-list.action"

export const useAppEventsListeners = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    const unregisterWindowFocusedListener = answerMain(
      AppEvents.WindowFocused,
      () => {
        dispatch(refreshBackupList())
      }
    )

    return () => {
      unregisterWindowFocusedListener()
    }
  }, [dispatch])
}

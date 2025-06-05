/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppHelp } from "app-utils/renderer"
import { HelpData } from "help/models"
import type { AppDispatch } from "app-store/models"
import { setHelpData } from "../store/help.actions"

export const useHelp = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    void (async () => {
      const data = await AppHelp.getData()
      dispatch(setHelpData(data))
    })()
  }, [dispatch])
}

export const useHelpSyncListener = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const listener = (_: unknown, payload: HelpData) => {
      dispatch(setHelpData(payload))
    }

    AppHelp.onDataUpdated(listener)

    return () => {
      AppHelp.removeDataUpdatedListener(listener)
    }
  }, [dispatch])
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setHelpData } from "./actions"
import { ipcRenderer } from "electron-better-ipc"
import { HelpEvent } from "help/models"

export const useHelp = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(setHelpData())

    ipcRenderer.answerMain(HelpEvent.DataUpdated, () => {
      dispatch(setHelpData())
    })
  }, [dispatch])
}

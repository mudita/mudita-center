/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { answerMain } from "shared/utils"
import { FileDialogToRendererEvents } from "system-utils/models"
import { updateDialogOpenStatus } from "./base.action"

export const useFileDialogEventListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return answerMain(FileDialogToRendererEvents.FileDialogOpened, () => {
      dispatch(updateDialogOpenStatus(true))
    })
  }, [dispatch])

  useEffect(() => {
    return answerMain(FileDialogToRendererEvents.FileDialogClosed, () => {
      dispatch(updateDialogOpenStatus(false))
    })
  }, [dispatch])
}

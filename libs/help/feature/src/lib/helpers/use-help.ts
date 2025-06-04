/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setHelpData } from "../store/help.actions"
import { AppHelp } from "app-utils/renderer"

export const useHelp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    void (async () => {
      const data = await AppHelp.getData()
      dispatch(setHelpData(data))
    })()
  }, [dispatch])
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { selectActiveApiDeviceId, setGenericConfig } from "generic-view/store"
import customViews from "./views"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useDevViews = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newConfig =
    viewKey in customViews
      ? customViews[viewKey as keyof typeof customViews]
      : undefined

  useEffect(() => {
    if (newConfig && process.env.DEV_API_CONFIG === "1") {
      dispatch(
        setGenericConfig({
          feature: viewKey,
          deviceId: activeDeviceId!,
          config: newConfig,
        })
      )
    }
  }, [activeDeviceId, dispatch, newConfig, viewKey])
}

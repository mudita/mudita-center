/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { selectActiveApiDeviceId, setGenericConfig } from "generic-view/store"
import { devViews } from "./views"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { isEmpty } from "lodash"

export const useDevViews = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)

  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const devConfig =
    viewKey in devViews ? devViews[viewKey as keyof typeof devViews] : undefined

  useEffect(() => {
    if (!isEmpty(devConfig) && process.env.DEV_API_CONFIG === "1") {
      dispatch(
        setGenericConfig({
          feature: viewKey,
          deviceId: activeDeviceId!,
          config: devConfig,
        })
      )
    }
  }, [activeDeviceId, dispatch, devConfig, viewKey])
}

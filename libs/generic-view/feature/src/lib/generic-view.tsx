/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { useParams } from "react-router"
import { GenericThemeProvider } from "generic-view/theme"
import RecursiveLayout from "./recursive-layout"
import GenericModals from "./generic-modals"
import { useDevConsole } from "./use-dev-console"
import {
  getEntitiesDataAction,
  selectActiveApiDeviceId,
  selectEntitiesTypesToPreload,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"

export const GenericView: FunctionComponent = () => {
  useDevConsole()
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const { viewKey, subviewKey } = useParams<{
    viewKey: string
    subviewKey?: string
  }>()
  const currentViewKey = subviewKey || viewKey

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entitiesToPreload =
    useSelector((state: ReduxRootState) => {
      return selectEntitiesTypesToPreload(state, currentViewKey)
    }) || []
  const entitiesToPreloadDependency = JSON.stringify(entitiesToPreload)

  useEffect(() => {
    for (const entitiesType of entitiesToPreload) {
      dispatch(getEntitiesDataAction({ entitiesType, deviceId }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId, dispatch, entitiesToPreloadDependency])

  return (
    <GenericThemeProvider>
      <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
      <GenericModals viewKey={currentViewKey} />
    </GenericThemeProvider>
  )
}

export default GenericView

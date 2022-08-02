/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  URL_MAIN,
  URL_OVERVIEW,
  URL_TABS,
} from "App/__deprecated__/renderer/constants/urls"
import { useHistory } from "react-router-dom"
import { changeLocation } from "App/core/actions"

type MainRoutesKeys = keyof typeof URL_MAIN
type MainRoutesValues = typeof URL_MAIN[MainRoutesKeys]
type NestedRoutesKeys = keyof typeof URL_TABS
type NestedRoutesValues = typeof URL_TABS[NestedRoutesKeys]
type OverviewRoutesKeys = keyof typeof URL_OVERVIEW
type OverViewRoutesValues = typeof URL_OVERVIEW[OverviewRoutesKeys]
type Values =
  | MainRoutesValues
  | (MainRoutesValues & NestedRoutesValues)
  | OverViewRoutesValues

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
type Actions = { [key in Values]?: Array<Function> }

const isPathnameCorrect = (
  actions: Actions,
  pathname: string
): pathname is MainRoutesValues => Object.keys(actions).includes(pathname)

export const useRouterListener = (
  history: Pick<History, "listen"> = useHistory(),
  actions: Actions
) => {
  const dispatch = useDispatch()

  useEffect(() => {
    return history.listen((location) => {
      dispatch(changeLocation())
      if (isPathnameCorrect(actions, location.pathname)) {
        for (const action of actions[location.pathname] ?? []) {
          action()
        }
      }
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])
}

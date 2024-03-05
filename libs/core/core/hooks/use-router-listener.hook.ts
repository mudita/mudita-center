/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  URL_MAIN,
  URL_OVERVIEW,
  URL_TABS,
} from "Core/__deprecated__/renderer/constants/urls"
import { useHistory } from "react-router-dom"
import { changeLocation } from "Core/core/actions"

type MainRoutesKeys = keyof typeof URL_MAIN
type MainRoutesValues = (typeof URL_MAIN)[MainRoutesKeys]
type NestedRoutesKeys = keyof typeof URL_TABS
type NestedRoutesValues = (typeof URL_TABS)[NestedRoutesKeys]
type OverviewRoutesKeys = keyof typeof URL_OVERVIEW
type OverViewRoutesValues = (typeof URL_OVERVIEW)[OverviewRoutesKeys]
export type Values =
  | MainRoutesValues
  | (MainRoutesValues & NestedRoutesValues)
  | OverViewRoutesValues

type Actions = { [key in Values]?: Array<() => void> }

const defaultActions: Actions = {
  [URL_MAIN.contacts]: [],
  [URL_OVERVIEW.root]: [],
  [URL_MAIN.messages]: [],
}

const isPathnameCorrect = (
  actions: Actions,
  pathname: string
): pathname is MainRoutesValues => Object.keys(actions).includes(pathname)

export const useRouterListener = (actions: Actions = defaultActions): void => {
  const history = useHistory()
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
  }, [history, dispatch, actions])
}

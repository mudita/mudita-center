/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { useEffect } from "react"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { useHistory } from "react-router-dom"

type MainRoutesKeys = keyof typeof URL_MAIN
type MainRoutesValues = typeof URL_MAIN[MainRoutesKeys]
type NestedRoutesKeys = keyof typeof URL_TABS
type NestedRoutesValues = typeof URL_TABS[NestedRoutesKeys]
type Values = MainRoutesValues | (MainRoutesValues & NestedRoutesValues)

type Actions = { [key in Values]?: Array<Function> }

const isPathnameCorrect = (
  actions: Actions,
  pathname: string
): pathname is MainRoutesValues => Object.keys(actions).includes(pathname)

const useRouterListener = (
  history: Pick<History, "listen"> = useHistory(),
  actions: Actions
) => {
  useEffect(() => {
    return history.listen((location) => {
      if (isPathnameCorrect(actions, location.pathname)) {
        for (const action of actions[location.pathname] ?? []) {
          action()
        }
      }
    })
  }, [history])
}

export default useRouterListener

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { useEffect } from "react"
import { URL_MAIN } from "Renderer/constants/urls"

type Keys = keyof typeof URL_MAIN
type Values = typeof URL_MAIN[Keys]

type Actions = { [key in Values]?: Array<Function> }

const isPathnameCorrect = (
  actions: Actions,
  pathname: string
): pathname is Values => Object.keys(actions).includes(pathname)

const useRouterListener = (
  history: Pick<History, "listen">,
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { useEffect } from "react"

const useRouterListener = (
  history: Pick<History, "listen">,
  actions: { [key: string]: Array<Function> }
) => {
  useEffect(() => {
    return history.listen((location) => {
      if (Object.keys(actions).includes(location.pathname)) {
        for (const action of actions[location.pathname]) {
          action()
        }
      }
    })
  }, [history])
}

export default useRouterListener

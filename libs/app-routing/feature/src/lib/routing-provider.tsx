/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HashRouter } from "react-router"
import { FunctionComponent, PropsWithChildren } from "react"
import { HistoryProvider } from "./history-provider/history-provider"

export const AppRoutingProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <HashRouter>
      <HistoryProvider>{children}</HistoryProvider>
    </HashRouter>
  )
}

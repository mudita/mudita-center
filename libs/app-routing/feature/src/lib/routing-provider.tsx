/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HashRouter } from "react-router"
import { FunctionComponent, PropsWithChildren } from "react"

export const AppRoutingProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <HashRouter>{children}</HashRouter>
}

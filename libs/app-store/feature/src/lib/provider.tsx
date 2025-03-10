/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { store } from "./app-store"

export const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useParams } from "react-router"
import { GenericThemeProvider } from "generic-view/theme"
import RecursiveLayout from "./recursive-layout"
import GenericModals from "./generic-modals"
import { useDevConsole } from "./use-dev-console"

export const GenericView: FunctionComponent = () => {
  useDevConsole()
  const { viewKey, subviewKey } = useParams<{
    viewKey: string
    subviewKey?: string
  }>()
  const currentViewKey = subviewKey || viewKey

  return (
    <GenericThemeProvider>
      <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
      <GenericModals viewKey={currentViewKey} />
    </GenericThemeProvider>
  )
}

export default GenericView

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { GenericThemeProvider } from "generic-view/theme"
import RecursiveLayout from "./recursive-layout"
import GenericModals from "./generic-modals"
import { useDevConsole } from "./use-dev-console"
import { useDevViews } from "./use-dev-views/use-dev-views"
import { GenericToasts } from "./generic-toasts"
import { FormsProvider, useCurrentViewKey } from "generic-view/utils"

export const GenericView: FunctionComponent = () => {
  useDevConsole()
  const currentViewKey = useCurrentViewKey()
  useDevViews(currentViewKey)

  return (
    <GenericThemeProvider>
      <FormsProvider>
        <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
        <GenericModals viewKey={currentViewKey} />
        <GenericToasts viewKey={currentViewKey} />
      </FormsProvider>
    </GenericThemeProvider>
  )
}

export default GenericView

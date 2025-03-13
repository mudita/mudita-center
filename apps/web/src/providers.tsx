/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { AppStoreProvider } from "app-store/feature"
import { AppIntlProvider } from "app-localize/feature"
import { AppThemeProvider } from "app-theme/feature"
import { AppRoutingProvider } from "app-routing/feature"

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <AppRoutingProvider>
      <AppStoreProvider>
        <AppThemeProvider>
          <AppIntlProvider>{children}</AppIntlProvider>
        </AppThemeProvider>
      </AppStoreProvider>
    </AppRoutingProvider>
  )
}

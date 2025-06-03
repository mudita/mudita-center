/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { AppStoreProvider } from "app-store/feature"
import { AppIntlProvider } from "app-localize/feature"
import { AppThemeProvider } from "app-theme/feature"
import { AppRoutingProvider } from "app-routing/feature"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutingProvider>
        <AppStoreProvider>
          <AppThemeProvider>
            <AppIntlProvider>{children}</AppIntlProvider>
          </AppThemeProvider>
        </AppStoreProvider>
      </AppRoutingProvider>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position={"bottom"} />
      )}
    </QueryClientProvider>
  )
}

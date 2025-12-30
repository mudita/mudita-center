/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { AppStoreProvider } from "app-store/feature"
import { AppIntlProvider } from "app-localize/feature"
import { AppThemeProvider } from "app-theme/feature"
import { AppRoutingProvider } from "app-routing/feature"
import { Toast } from "app-theme/ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 6,
      staleTime: Infinity,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutingProvider>
        <AppStoreProvider>
          <AppThemeProvider>
            <AppIntlProvider>
              <Toast.Provider>{children}</Toast.Provider>
            </AppIntlProvider>
          </AppThemeProvider>
        </AppStoreProvider>
      </AppRoutingProvider>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position={"bottom"} />
      )}
    </QueryClientProvider>
  )
}

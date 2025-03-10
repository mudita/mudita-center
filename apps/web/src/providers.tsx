/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { store } from "app-store/feature"
import { Provider as ReduxProvider } from "react-redux"
import { IntlProvider } from "react-intl"
import { enUS } from "app-localize/feature"

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ReduxProvider store={store}>
      <IntlProvider messages={enUS} locale={"en"} defaultLocale={"en"}>
        {children}
      </IntlProvider>
    </ReduxProvider>
  )
}

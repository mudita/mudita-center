/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IntlProvider } from "react-intl"
import { FunctionComponent, PropsWithChildren } from "react"
import { enUS } from "app-localize/utils"

export const AppIntlProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <IntlProvider messages={enUS} locale={"en"} defaultLocale={"en"}>
      {children}
    </IntlProvider>
  )
}

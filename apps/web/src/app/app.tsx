/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppRoutes } from "app-routing/routes"
import { DevicesInitializer } from "devices/common/feature"
import { FunctionComponent } from "react"
import { CheckInitRequirements } from "app-init/feature"

export const App: FunctionComponent = () => {
  return (
    <>
      <DevicesInitializer />
      <CheckInitRequirements />
      <AppRoutes />
    </>
  )
}

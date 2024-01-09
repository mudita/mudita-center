/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
import AppInitializationFlow from "Core/app-initialization/components/app-initialization-flow.component"
import { useInitializingAppEffects } from "Core/app-initialization/hooks/use-initializing-app-effects"
import { useGenericStoreDemo } from "generic-view/store"

const AppInitialization: FunctionComponent = () => {
  const appInitializationStatus = useSelector(getAppInitializationStatus)

  useInitializingAppEffects()

  // TODO: Demo purpose only, remove in future
  useGenericStoreDemo()

  if (appInitializationStatus !== AppInitializationStatus.Initialized) {
    return <AppInitializationFlow />
  }

  return <></>
}

export default AppInitialization

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { History } from "history"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
import AppInitializationFlow from "Core/app-initialization/components/app-initialization-flow.component"
import { useDeviceConnectedEffect } from "Core/app-initialization/hooks/use-device-connected-effect"
import { useApplicationUpdateEffects } from "Core/app-initialization/hooks/use-application-update-effects"
import { useInitializingAppEffects } from "Core/app-initialization/hooks/use-initializing-app-effects"

interface Props {
  history: History
}

const AppInitialization: FunctionComponent<Props> = ({ history }) => {
  const appInitializationStatus = useSelector(getAppInitializationStatus)

  useDeviceConnectedEffect(history)
  useApplicationUpdateEffects()
  useInitializingAppEffects(history)

  if (appInitializationStatus !== AppInitializationStatus.Initialized) {
    return <AppInitializationFlow />
  }

  return <></>
}

export default AppInitialization

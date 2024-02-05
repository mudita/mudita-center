/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import MuditaCenterOnSudoModeContainer from "Core/settings/components/usb-access/mudita-center-on-sudo-mode.container"
import USBAccessFlowContainer from "Core/settings/components/usb-access/usb-access-flow.container"
import { ModalsManagerState } from "Core/modals-manager/reducers/modals-manager.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
// import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
// import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
// import AppInitializationFlow from "Core/app-initialization/components/app-initialization-flow.component"
// import { useInitializingAppEffects } from "Core/app-initialization/hooks/use-initializing-app-effects"

const AppInitialization: FunctionComponent = () => {
  //const appInitializationStatus = useSelector(getAppInitializationStatus)
  const { usbAccessFlowShow, appRunWithSudoShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )

  //useInitializingAppEffects()

  // if (appInitializationStatus !== AppInitializationStatus.Initialized) {
  //   return <AppInitializationFlow />
  // }

  if (appRunWithSudoShow) {
    return <MuditaCenterOnSudoModeContainer />
  }

  if (usbAccessFlowShow) {
    return <USBAccessFlowContainer />
  }

  return <></>
}

export default AppInitialization

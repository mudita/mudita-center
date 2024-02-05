/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useGenericStoreDemo } from "generic-view/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startInitializingApp } from "Core/app-initialization/actions/start-initializing-app"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { isAppUpdateProcessPassed } from "Core/app-initialization/selectors/is-app-update-process-passed.selector"
//import { redirectToDiscovery } from "Core/app-initialization/actions/redirect-to-discovery.action"
import PrivacyPolicyModal from "Core/settings/components/privacy-policy-modal/privacy-policy-modal.component"
import { shouldPrivacyPolicyVisible } from "Core/app-initialization/selectors/should-privacy-policy-visible.selector"
import { shouldAppUpdateFlowVisible } from "Core/app-initialization/selectors/should-app-update-flow-visible.selector"
import { AppUpdateFlow } from "Core/settings/components/app-update-flow/app-update-flow.component"
import MuditaCenterOnSudoModeContainer from "Core/settings/components/usb-access/mudita-center-on-sudo-mode.container"
import USBAccessFlowContainer from "Core/settings/components/usb-access/usb-access-flow.container"
import { ModalsManagerState } from "Core/modals-manager/reducers/modals-manager.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setAppInitializationStatus } from "Core/app-initialization/actions/base.action"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

const AppInitialization: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()

  const appUpdateProcessPassed = useSelector(isAppUpdateProcessPassed)
  const privacyPolicyVisible = useSelector(shouldPrivacyPolicyVisible)
  const appUpdateFlowVisible = useSelector(shouldAppUpdateFlowVisible)
  const { usbAccessFlowShow, appRunWithSudoShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )

  // TODO: Demo purpose only, remove in future
  useGenericStoreDemo()

  useEffect(() => {
    dispatch(startInitializingApp())
  }, [dispatch])

  useEffect(() => {
    const initializationFinished =
      appUpdateProcessPassed &&
      !privacyPolicyVisible &&
      !appRunWithSudoShow &&
      !usbAccessFlowShow
    if (initializationFinished) {
      dispatch(setAppInitializationStatus(AppInitializationStatus.Initialized))
      //dispatch(redirectToDiscovery(history))
    }
  }, [
    history,
    dispatch,
    appUpdateProcessPassed,
    privacyPolicyVisible,
    appRunWithSudoShow,
    usbAccessFlowShow,
  ])

  if (privacyPolicyVisible) {
    return <PrivacyPolicyModal />
  }

  if (appUpdateFlowVisible) {
    return <AppUpdateFlow />
  }

  if (appRunWithSudoShow) {
    return <MuditaCenterOnSudoModeContainer />
  }

  if (usbAccessFlowShow) {
    return <USBAccessFlowContainer />
  }
          
  if (appInitializationStatus !== AppInitializationStatus.Initialized) {
    return <AppInitializationFlow />
  }

  return <></>
}

export default AppInitialization

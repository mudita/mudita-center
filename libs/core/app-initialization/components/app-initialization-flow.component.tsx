/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import PrivacyPolicyModal from "Core/settings/components/privacy-policy-modal/privacy-policy-modal.component"
import { shouldPrivacyPolicyVisible } from "Core/app-initialization/selectors/should-privacy-policy-visible.selector"
import { shouldAppUpdateFlowVisible } from "Core/app-initialization/selectors/should-app-update-flow-visible.selector"
import { AppUpdateFlow } from "Core/settings/components/app-update-flow/app-update-flow.component"
import USBAccessFlowContainer from "Core/settings/components/usb-access/usb-access-flow.container"
import { modalsManagerStateSelector } from "Core/modals-manager/selectors"
import { appInitializationState } from "Core/app-initialization/selectors/app-initialization-state.selector"

const AppInitializationFlow: FunctionComponent = () => {
  const privacyPolicyVisible = useSelector(shouldPrivacyPolicyVisible)
  const appUpdateFlowVisible = useSelector(shouldAppUpdateFlowVisible)
  const { usbAccessFlowShow } = useSelector(modalsManagerStateSelector)
  const { appInitializationPreparationFinished } = useSelector(
    appInitializationState
  )

  if (!appInitializationPreparationFinished) {
    return <></>
  }

  if (usbAccessFlowShow) {
    return <USBAccessFlowContainer />
  }

  if (privacyPolicyVisible) {
    return <PrivacyPolicyModal />
  }

  if (appUpdateFlowVisible) {
    return <AppUpdateFlow />
  }

  return <></>
}

export default AppInitializationFlow

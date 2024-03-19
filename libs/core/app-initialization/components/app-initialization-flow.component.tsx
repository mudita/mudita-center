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

const AppInitializationFlow: FunctionComponent = () => {
  const privacyPolicyVisible = useSelector(shouldPrivacyPolicyVisible)
  const appUpdateFlowVisible = useSelector(shouldAppUpdateFlowVisible)

  if (privacyPolicyVisible) {
    return <PrivacyPolicyModal />
  }

  if (appUpdateFlowVisible) {
    return <AppUpdateFlow />
  }

  return <></>
}

export default AppInitializationFlow

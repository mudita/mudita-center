/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  AppForcedUpdateFlowContainer,
  AppUpdateFlowContainer,
} from "App/settings/components"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "App/update/components/update-os-interrupted-flow"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import PrivacyPolicyModal from "App/settings/components/privacy-policy-modal/privacy-policy-modal.component"

type Props = {
  appForcedUpdateFlowShow: boolean
  appUpdateFlowShow: boolean
  contactSupportFlowShow: boolean
}

const ModalsManager: FunctionComponent<Props> = ({
  appForcedUpdateFlowShow,
  appUpdateFlowShow,
  contactSupportFlowShow,
}) => {
  const { privacyPolicyAccepted } = useSelector(
    (state: ReduxRootState) => state.settings
  )

  if (privacyPolicyAccepted === false) {
    return <PrivacyPolicyModal />
  }

  return (
    <>
      {appForcedUpdateFlowShow && <AppForcedUpdateFlowContainer />}
      {appUpdateFlowShow && <AppUpdateFlowContainer />}
      {contactSupportFlowShow && <ContactSupportFlow />}
      <UpdateOsInterruptedFlowContainer />
    </>
  )
}

export default ModalsManager

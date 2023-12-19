/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  AppForcedUpdateFlowContainer,
  AppUpdateFlowContainer,
} from "Core/settings/components"
import ContactSupportFlow from "Core/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "Core/update/components/update-os-interrupted-flow"
import ErrorConnectingModal from "Core/connecting/components/error-connecting-modal"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import PrivacyPolicyModal from "Core/settings/components/privacy-policy-modal/privacy-policy-modal.component"

type Props = {
  appForcedUpdateFlowShow: boolean
  appUpdateFlowShow: boolean
  contactSupportFlowShow: boolean
  deviceInitializationFailedModalShowEnabled: boolean
  hideModals: () => void
}

const ModalsManager: FunctionComponent<Props> = ({
  appForcedUpdateFlowShow,
  appUpdateFlowShow,
  contactSupportFlowShow,
  deviceInitializationFailedModalShowEnabled,
  hideModals,
}) => {
  const { privacyPolicyAccepted } = useSelector(
    (state: ReduxRootState) => state.settings
  )

  if (privacyPolicyAccepted === false) {
    return <PrivacyPolicyModal />
  }

  return (
    <>
      {deviceInitializationFailedModalShowEnabled && (
        <ErrorConnectingModal open closeModal={hideModals} />
      )}
      {appForcedUpdateFlowShow && <AppForcedUpdateFlowContainer />}
      {appUpdateFlowShow && <AppUpdateFlowContainer />}
      {contactSupportFlowShow && <ContactSupportFlow />}
      <UpdateOsInterruptedFlowContainer />
    </>
  )
}

export default ModalsManager

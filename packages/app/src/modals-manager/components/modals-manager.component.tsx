/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitState } from "App/device"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  AppForcedUpdateFlowContainer,
  AppUpdateFlowContainer,
} from "App/settings/components"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "App/update/components/update-os-interrupted-flow"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import PrivacyPolicyModal from "App/settings/components/privacy-policy-modal/privacy-policy-modal.component"

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
  const dispatch = useDispatch()
  const { privacyPolicyAccepted } = useSelector(
    (state: ReduxRootState) => state.settings
  )

  if (privacyPolicyAccepted === false) {
    return <PrivacyPolicyModal />
  }

  const handleCloseErrorConnectingModal = () => {
    void dispatch(setInitState())
    hideModals()
  }

  return (
    <>
      {deviceInitializationFailedModalShowEnabled && (
        <ErrorConnectingModal
          open
          closeModal={handleCloseErrorConnectingModal}
        />
      )}
      {appForcedUpdateFlowShow && <AppForcedUpdateFlowContainer />}
      {appUpdateFlowShow && <AppUpdateFlowContainer />}
      {contactSupportFlowShow && <ContactSupportFlow />}
      <UpdateOsInterruptedFlowContainer />
    </>
  )
}

export default ModalsManager

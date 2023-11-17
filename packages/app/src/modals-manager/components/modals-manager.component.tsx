/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  AppForcedUpdateFlowContainer,
  AppUpdateFlowContainer,
} from "App/settings/components"
import ContactSupportFlow from "App/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "App/update/components/update-os-interrupted-flow"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"
import { useSelector, useDispatch } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import PrivacyPolicyModal from "App/settings/components/privacy-policy-modal/privacy-policy-modal.component"
import MuditaCenterOnSudoModeModal from "App/settings/components/usb-access/mudita-center-on-sudo-mode.modal"
import AllowUSBPortAccessModal from "App/settings/components/usb-access/allow-usb-port-access.modal"
import USBAccessGrantedModal from "App/settings/components/usb-access/usb-access-granted.modal"
import RestartYourComputerToConnectModal from "App/settings/components/usb-access/restart-your-computer-to-connect.modal"
import CantConnectWithoutUSBPortAccessModal from "App/settings/components/usb-access/cant-connect-without-usb-port-access.modal"
import MuditaCenterOnSudoModeContainer from "App/settings/components/usb-access/mudita-center-on-sudo-mode.container"
import USBAccessFlowContainer from "App/settings/components/usb-access/usb-access-flow.container"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"
import { hideModals } from "App/modals-manager/actions/base.action"
import { ModalStateKey } from "App/modals-manager/reducers"

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
  const { USBAccessFlowShow } = useSelector(
    (state: ReduxRootState) => state.modalsManager
  )

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
      <MuditaCenterOnSudoModeContainer />
      {USBAccessFlowShow && <USBAccessFlowContainer />}
    </>
  )
}

export default ModalsManager

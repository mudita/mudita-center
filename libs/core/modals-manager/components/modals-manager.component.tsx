/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ContactSupportFlow from "Core/contact-support/containers/contact-support-flow.container"
import { UpdateOsInterruptedFlowContainer } from "Core/update/components/update-os-interrupted-flow"
import ErrorConnectingModal from "Core/connecting/components/error-connecting-modal"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import MuditaCenterOnSudoModeContainer from "Core/settings/components/usb-access/mudita-center-on-sudo-mode.container"
import USBAccessFlowContainer from "Core/settings/components/usb-access/usb-access-flow.container"
import { ModalsManagerState } from "Core/modals-manager/reducers/modals-manager.interface"

type Props = {
  contactSupportFlowShow: boolean
  deviceInitializationFailedModalShowEnabled: boolean
  hideModals: () => void
}

const ModalsManager: FunctionComponent<Props> = ({
  contactSupportFlowShow,
  deviceInitializationFailedModalShowEnabled,
  hideModals,
}) => {
  const { usbAccessFlowShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )

  return (
    <>
      {deviceInitializationFailedModalShowEnabled && (
        <ErrorConnectingModal open closeModal={hideModals} />
      )}
      {contactSupportFlowShow && <ContactSupportFlow />}
      <UpdateOsInterruptedFlowContainer />
      <MuditaCenterOnSudoModeContainer />
      {usbAccessFlowShow && <USBAccessFlowContainer />}
    </>
  )
}

export default ModalsManager

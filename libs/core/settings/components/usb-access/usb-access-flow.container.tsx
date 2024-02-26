/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { hideModals } from "Core/modals-manager/actions/base.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import AllowUSBPortAccessModal from "Core/settings/components/usb-access/allow-usb-port-access.modal"
import USBAccessGrantedModal from "Core/settings/components/usb-access/usb-access-granted.modal"
import RestartYourComputerToConnectModal from "Core/settings/components/usb-access/restart-your-computer-to-connect.modal"
import CantConnectWithoutUSBPortAccessModal from "Core/settings/components/usb-access/cant-connect-without-usb-port-access.modal"
import { addUserToSerialPortGroup } from "Core/desktop/requests/add-user-to-serial-port-group.request"
import { setUSBAccessRestartRequired } from "Core/settings/actions/set-usb-access-restart-needed.action"
import { UsbAccessFlowTestIds } from "Core/settings/components/usb-access/usb-access-flow-test-ids.enum"
import { isUSBAccessRestartRequiredSelector } from "Core/settings/selectors/is-usb-access-restart-requaired.selector"

enum USBAccessState {
  notGranted = "not-granted",
  notGrantedCancelled = "not-granted-cancelled",
  grantedNeedsRestart = "granted-needs-restart",
  granted = "granted",
}

const USBAccessFlowContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const usbAccessRestartRequired = useSelector(isUSBAccessRestartRequiredSelector)
  const [accessState, setAccessState] = useState<USBAccessState>(
    usbAccessRestartRequired
      ? USBAccessState.grantedNeedsRestart
      : USBAccessState.notGranted
  )

  return (
    <div data-testid={UsbAccessFlowTestIds.USBAccessFlowContainer}>
      <AllowUSBPortAccessModal
        testId={UsbAccessFlowTestIds.AllowUSBPortAccessModal}
        title="Mudita Center"
        open={accessState === USBAccessState.notGranted}
        closeModal={() => {
          setAccessState(USBAccessState.notGrantedCancelled)
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={async () => {
          await addUserToSerialPortGroup()
          await dispatch(setUSBAccessRestartRequired(true))
          setAccessState(USBAccessState.granted)
        }}
        actionButtonLabel="ALLOW"
        closeButton={false}
      />
      <USBAccessGrantedModal
        testId={UsbAccessFlowTestIds.USBAccessGrantedModal}
        title="Mudita Center"
        open={accessState === USBAccessState.granted}
        closeModal={() => {
          dispatch(hideModals())
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={() => {
          dispatch(hideModals())
        }}
        actionButtonLabel="OK"
        closeButton={false}
      />
      <RestartYourComputerToConnectModal
        testId={UsbAccessFlowTestIds.RestartYourComputerToConnectModal}
        title="Error"
        open={accessState === USBAccessState.grantedNeedsRestart}
        closeModal={() => {
          dispatch(hideModals())
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={() => {
          dispatch(hideModals())
        }}
        actionButtonLabel="OK"
        closeButton={false}
      />
      <CantConnectWithoutUSBPortAccessModal
        testId={UsbAccessFlowTestIds.CantConnectWithoutUSBPortAccessModal}
        title="Error"
        open={accessState === USBAccessState.notGrantedCancelled}
        closeModal={() => {
          dispatch(hideModals())
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={() => {
          dispatch(hideModals())
        }}
        actionButtonLabel="OK"
        closeButton={false}
      />
    </div>
  )
}

export default USBAccessFlowContainer

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { hideModals } from "App/modals-manager/actions/base.action"
import { ModalLayers } from "App/modals-manager/constants/modal-layers.enum"
import AllowUSBPortAccessModal from "App/settings/components/usb-access/allow-usb-port-access.modal"
import USBAccessGrantedModal from "App/settings/components/usb-access/usb-access-granted.modal"
import RestartYourComputerToConnectModal from "App/settings/components/usb-access/restart-your-computer-to-connect.modal"
import CantConnectWithoutUSBPortAccessModal from "App/settings/components/usb-access/cant-connect-without-usb-port-access.modal"
import { AnyAction } from "redux"
import { addUserToSerialPortGroup } from "App/machine/requests/add-user-to-serial-port-group.request"
import { setSettings } from "App/settings/actions/set-settings.action"

enum USBAccessState {
  notGranted = "not-granted",
  notGrantedCancelled = "not-granted-cancelled",
  grantedNeedsRestart = "granted-needs-restart",
  granted = "granted",
}

const USBAccessFlowContainer = () => {
  const [accessState, setAccessState] = useState<USBAccessState>(
    USBAccessState.notGranted
  )

  const { usbAccessRestart } = useSelector(
    (state: ReduxRootState) => state.settings
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (usbAccessRestart) {
      setAccessState(USBAccessState.grantedNeedsRestart)
    }
  }, [usbAccessRestart])

  return (
    <>
      <AllowUSBPortAccessModal
        title="Mudita Center"
        open={accessState === USBAccessState.notGranted}
        closeModal={() => {
          setAccessState(USBAccessState.notGrantedCancelled)
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={async () => {
          await addUserToSerialPortGroup()
          setSettings({ usbAccessRestart: true })
          setAccessState(USBAccessState.granted)
        }}
        actionButtonLabel="ALLOW"
        closeButton={false}
      />
      <USBAccessGrantedModal
        title="Mudita Center"
        open={accessState === USBAccessState.granted}
        closeModal={() => {
          dispatch(hideModals())
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={() => {
          setAccessState(USBAccessState.grantedNeedsRestart)
        }}
        actionButtonLabel="OK"
        closeButton={false}
      />
      <RestartYourComputerToConnectModal
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
    </>
  )
}

export default USBAccessFlowContainer

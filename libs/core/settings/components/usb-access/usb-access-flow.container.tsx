/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { hideModals } from "Core/modals-manager/actions/base.action"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import AllowUSBPortAccessModal from "Core/settings/components/usb-access/allow-usb-port-access.modal"
import USBAccessGrantedModal from "Core/settings/components/usb-access/usb-access-granted.modal"
import RestartYourComputerToConnectModal from "Core/settings/components/usb-access/restart-your-computer-to-connect.modal"
import CantConnectWithoutUSBPortAccessModal from "Core/settings/components/usb-access/cant-connect-without-usb-port-access.modal"
import { addUserToSerialPortGroup } from "Core/desktop/requests/add-user-to-serial-port-group.request"
import { setSetting } from "Core/settings/actions/set-setting.action"
import logger from "Core/__deprecated__/main/utils/logger"
import { SettingsState } from "Core/settings/reducers"

enum USBAccessState {
  notGranted = "not-granted",
  notGrantedCancelled = "not-granted-cancelled",
  grantedNeedsRestart = "granted-needs-restart",
  granted = "granted",
}

const USBAccessFlowContainer = () => {
  logger.info(`USBAccessFlowContainer render`)

  const [accessState, setAccessState] = useState<USBAccessState>(
    USBAccessState.notGranted
  )

  const { usbAccessRestart } = useSelector(
    (state: ReduxRootState): SettingsState => state.settings
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (usbAccessRestart) {
      setAccessState(USBAccessState.grantedNeedsRestart)
    }
  }, [usbAccessRestart])

  return (
    <>
      <div>accessState: {accessState}</div>
      <div>usbAccessRestart: {usbAccessRestart ? "true" : "false"}</div>
      <AllowUSBPortAccessModal
        title="Mudita Center"
        open={accessState === USBAccessState.notGranted}
        closeModal={() => {
          setAccessState(USBAccessState.notGrantedCancelled)
        }}
        layer={ModalLayers.LinuxSerialPortGroup}
        onActionButtonClick={async () => {
          logger.info(`before addUserToSerialPortGroup`)
          await addUserToSerialPortGroup()
          logger.info(`after addUserToSerialPortGroup`)
          dispatch(setSetting({ key: "usbAccessRestart", value: true }))
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

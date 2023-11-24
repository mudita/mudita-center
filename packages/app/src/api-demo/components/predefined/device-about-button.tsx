import { APIFC } from "App/api-demo/models/api-fc"
import React, { FunctionComponent } from "react"

interface DeviceAboutButtonProperties {
  buttonLabel?: string
  modalContent?: string
}

export const DeviceAboutButton: APIFC<DeviceAboutButtonProperties> = ({
  parameters,
}) => {
  const { buttonLabel, modalContent } = parameters
  const openModal = () => {
    alert(modalContent)
  }
  return <button onClick={openModal}>{buttonLabel}</button>
}

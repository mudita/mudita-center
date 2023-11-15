import React, { FunctionComponent } from "react"

interface DeviceAboutButtonProperties {
  data?: {
    buttonLabel: string
    modalContent: string
  }
}

export const DeviceAboutButton: FunctionComponent<DeviceAboutButtonProperties> = ({ data }) => {
  const { buttonLabel, modalContent } = data || {}
  const openModal = () => {
    alert(modalContent)
  }
  return <button onClick={openModal}>{buttonLabel}</button>
}

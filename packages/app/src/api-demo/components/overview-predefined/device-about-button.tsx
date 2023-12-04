/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "../../models/api-fc.types"
import React from "react"

interface DeviceAboutButtonProperties {
  buttonLabel?: string
  modalContent?: string
}

export const DeviceAboutButton: APIFC<DeviceAboutButtonProperties> = ({
  config,
}) => {
  const { buttonLabel, modalContent } = config || {}
  const openModal = () => {
    alert(modalContent)
  }
  return <button onClick={openModal}>{buttonLabel}</button>
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"

interface DeviceAboutButtonProperties {
  buttonLabel?: string
  modalContent?: string
}

export const DeviceAboutButton: APIFC<
  undefined,
  DeviceAboutButtonProperties
> = ({ config }) => {
  const { buttonLabel, modalContent } = config || {}
  const openModal = () => {
    alert(modalContent)
  }
  return <button onClick={openModal}>{buttonLabel}</button>
}
